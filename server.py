#!/usr/bin/python

import tornado.ioloop
import tornado.web
import os.path
import json
import random

games = dict()
ngames = 0

def generateTerrain(w,h):
	board = []

	for y in range(0,h):
		for x in range(0,w):
			i = (y * w) + x
			b = dict()
			b['terrain'] = random.randint(0,100)
			b['controller'] = random.randint(0,3)
			b['productivity'] = random.randint(0,100)
			b['troops'] = 0
			b['spigot'] = [0,0,0,0,0,0]
			b['x'] = x
			b['y'] = y
			board.append(b)
	return board

class StateHandler(tornado.web.RequestHandler):
	def get(self, game, player):
		global games
		self.write(json.dumps(games[int(game)]))

	def post(self, game, player):
		global games
		delta = json.loads(self.get_argument("data"))
		
		for d in delta:
			print "DELTA: X: " + str(d['x']) + " Y: " + str(d['y'])
			i = (int(d['y']) * games[int(game)]['width']) + int(d['x'])
			g = games[int(game)]['board'][i]
			#g['controller'] = d['controller']
			g['troops'] = d['troops']
			g['spigot'] = d['spigot']

		self.write(json.dumps(games[int(game)]))

class NewHandler(tornado.web.RequestHandler):
	def get(self, width, height):
		global games
		global ngames
		games[ngames] = dict()
		games[ngames]['width'] = int(width)
		games[ngames]['height'] = int(height)
		games[ngames]['board'] = generateTerrain(int(width),int(height))

		self.write("{id: " + str(ngames) + "}");
		ngames = ngames + 1
		print str(games)

settings = {
    "static_path": os.path.dirname(__file__)
}

application = tornado.web.Application([
    (r"/state/([0-9]+)/([0-9]+)", StateHandler),
    (r"/new/([0-9]+)/([0-9]+)", NewHandler),
], **settings)

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

