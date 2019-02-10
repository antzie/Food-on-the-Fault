#!/usr/bin/env python2

# Version 2. 12-11-2018

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from setup_db import Base, LocationsTable, TestTable, engine #import engine so only have to change 1 variable

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


location1 = LocationsTable(
						name = "BurgerFuel",
						type = "Burgerjoint",
						ll = "-41.292838,174.778846",
						longitude = '174.778853',
						latitude = '-41.292883',
						)
location2 = LocationsTable(
						name = "Southern Cross",
						type = "Restaurant",
						ll = "-41.296555,174.774423",
						longitude = '174.774423',
						latitude = '-41.296555',
						) 
location3 = LocationsTable(
						name = "1154 Pastaria",
						type = "Restaurant",
						ll = "-41.293340,174.775530",
						longitude = '174.77553',
						latitude = '-41.29334',
						) 
location4 = LocationsTable(
						name = "Ombra",
						type = "Restaurant",
						ll = "-41.294907,174.774969",
						longitude = '174.774969',
						latitude = '-41.294907',
						) 

location5 = LocationsTable(
						name = "Library Bar",
						type = "Bar",
						ll = "-41.293563,174.781084",
						longitude = '174.781084',
						latitude = '-41.293563',
						) 
location6 = LocationsTable(
						name = "HawThorn Lounge",
						type = "Bar",
						ll = "-41.294950,174.780160",
						longitude = '174.78016',
						latitude = '-41.29495',
						) 

location7 = LocationsTable(
						name = "Scopa Caffe Cucina",
						type = "Restaurant",
						ll = "-41.293400,174.775800",
						longitude = '174.7758',
						latitude = '-41.2934',
						)
location8 = LocationsTable(
						name = "The Old Bailey",
						type = "Bar",
						ll = "-41.280190,174.776250",
						longitude = '174.77625',
						latitude = '-41.28019',
						) 

location9 = LocationsTable(
						name = "Gotham's Cafe",
						type = "Cafe",
						ll = "-41.287660,174.776560",
						longitude = '174.77656',
						latitude = '-41.28766',
						) 


LocationsList = [location1, location2, location3, location4, location5, location6, location7, location8, location9]
for Item in LocationsList:
	session.add(Item)
	session.commit()

print 'Successfully commited items to database'