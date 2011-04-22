#!/usr/bin/python

import tornado.ioloop
import tornado.web
import os.path
import json
import random
import time
import math

cfg = dict()

game = dict()
ngames = 0
lastUpdate = time.time()

def updateTroops(delta, productivity, currentLevel):
	global cfg

	if currentLevel >= 100:
		return 100
	
	incr = int((productivity / 100.0) * (cfg['growthRate'] * delta))

	if currentLevel + incr > 100:
		return 100
	
	return currentLevel + incr

def findAdjacent(cell,spigot):
	y = math.floor(cell / game['width'])
	x = cell - (y * game['width'])

	if spigot == 6:
		spigot = 0

	evens = [[0,-2],[1,-1],[1,1],[0,2],[0,1],[0,-1]]
	odds =  [[0,-2],[0,-1],[0,1],[0,2],[-1,1],[-1,-1]]

	print "Spigot: " + str(spigot)

	# Even Y
	if y % 2 == 0:
		xp = evens[spigot][0] + x
		yp = evens[spigot][1] + y
		return int((game['width'] * yp) + xp)
	else:
		xp = odds[spigot][0] + x
		yp = odds[spigot][1] + y
		return int((game['width'] * yp) + xp)

def flow(delta,nspig,src,dst):
	global game
	global cfg

	fr = int(float(cfg['flowRate'] * delta) / float(nspig))
	
	if game['board'][src]['troops'] < fr:
		fr = game['board'][src]['troops'] - 1
	
	if game['board'][dst]['troops'] + fr > 100:
		fr = (100 - game['board'][dst]['troops'])
	
	if fr < 0:
		fr = 0
	
	game['board'][src]['troops'] = game['board'][src]['troops'] - fr
	game['board'][dst]['troops'] = game['board'][dst]['troops'] + fr

	if game['board'][dst]['controller'] == 0 and fr > 0:
		game['board'][dst]['controller'] = game['board'][src]['controller']

	print "Flow from " + str(src) + " to " + str(dst) + " of amount " + str(fr)

def updateFlow(delta, i):
	global game
	global cfg

	if game['board'][i]['troops'] == 0:
		return

	nspig = sum(game['board'][i]['spigot'])

	for s in range(0,len(game['board'][i]['spigot'])):
		if game['board'][i]['spigot'][s]:
			adj = findAdjacent(i,s)
			flow(delta,nspig,i,adj)

def stateUpdate():
	global game
	global lastUpdate
	global cfg
	ctime = time.time()
	delta = ctime - lastUpdate
	sortOrder = range(0,game['width']*game['height'])
	random.shuffle(sortOrder)
	lastUpdate = ctime

	for i in sortOrder:
		updateFlow(delta,i)
		if game['board'][i]['controller'] > 0:
			game['board'][i]['troops'] = updateTroops(delta,game['board'][i]['productivity'],game['board'][i]['troops'])

	print "[state update] delta: " + str(delta) + ", order:" 

def generateTerrain(w,h):
	board = []

	for y in range(0,h):
		for x in range(0,w):
			i = (y * w) + x
			b = dict()
			b['terrain'] = random.randint(0,100)
			b['controller'] = 0 
			b['productivity'] = random.randint(0,100)
			b['troops'] = 0
			b['spigot'] = [0,0,0,0,0,0]
			b['x'] = x
			b['y'] = y
			board.append(b)
	
	board[35]['controller'] = 2
	board[35]['troops'] = 50
	return board

def init(width,height):
	global game
	game['width'] = int(width)
	game['height'] = int(height)
	game['board'] = generateTerrain(int(width),int(height))

class StateHandler(tornado.web.RequestHandler):
	def get(self, g, player):
		global game
		stateUpdate()
		self.write(json.dumps(game))

	def post(self, g, player):
		global game
		delta = json.loads(self.get_argument("data"))
		
		for d in delta:
			i = (int(d['y']) * game['width']) + int(d['x'])
			g = game['board'][i]
			#g['controller'] = d['controller']
			#g['troops'] = d['troops']
			g['spigot'] = d['spigot']

		stateUpdate()

		self.write(json.dumps(game))

settings = {
    "static_path": os.path.dirname(__file__)
}

application = tornado.web.Application([
    (r"/state/([0-9]+)/([0-9]+)", StateHandler),
], **settings)

if __name__ == "__main__":
	cfg['growthRate'] = 10 # How many seconds to fill a hex at 100% productivity?
	cfg['flowRate'] = 5    # How many troops flow through a spigot per tick?
	init(10,28)
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

