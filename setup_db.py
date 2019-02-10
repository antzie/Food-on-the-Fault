#!/usr/bin/env python2
# Version 1. 
# Database setup for deployApp

import sys
import os

from sqlalchemy import Column, ForeignKey, Integer, String, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:colourpop@localhost:5432/maps')
Base = declarative_base()
#engine = create_engine('postgresql://postgres:colourpop@localhost:5432/maps')

##############
### Tables


class LocationsTable(Base):
	# Name 
	__tablename__ = 'locations'

	# Columns
	id = Column(Integer, primary_key = True)
	name = Column(String(250), nullable = False)
	type = Column(String(250), nullable = False)
	ll = Column(String(250), nullable = False)
	longitude = Column(String(250), nullable = False)
	latitude = Column(String(250), nullable = False)

	@property
	def serialize(self):
		"""Return object data in easily serializeable format"""
		return {
		'id' 		: self.id,
		'name'		: self.name,
		'type'      : self.type,
		'll'        : self.ll,
		'longitude' : self.longitude,
		'latitude'  : self.latitude
	}	


class TestTable(Base):
	# Name 
	__tablename__ = 'test_table'

	# Columns
	id = Column(Integer, primary_key = True)
	name = Column(String(250), nullable = False)
	longitude = Column(String(250), nullable = False)


	@property
	def serialize(self):
		"""Return object data in easily serializeable format"""
		return {
		'id' 		: self.id,
		'name'		: self.name,
		'longitude' : self.longitude,
	}	
	
Base.metadata.create_all(engine) 