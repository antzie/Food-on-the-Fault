from flask import (Flask, render_template,
                   request, redirect, url_for, jsonify, flash)

# Database modules + database

from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import SingletonThreadPool
from setup_db import Base, LocationsTable, TestTable, engine

app = Flask(__name__)
# Database Connection and Session

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# JSON API Endpoints

# Locations and associated Data
@app.route('/locationsJSON/')
def locationsJSON():
  categories = session.query(LocationsTable).order_by('id').all()
  return jsonify(categories=[category.serialize for category in categories])


#############################################################

# Website Framework and Endpoints
@app.route('/')
@app.route('/main/')
def mainPage():
	return render_template('map.html')


if __name__ == '__main__':
    app.secret_key = 'conjour up'
    app.debug = True
    app.run(host='0.0.0.0', port=8000)