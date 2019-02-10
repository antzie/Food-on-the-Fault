# Map of Wellington, NZ (README under Construction)
A Flask full-stack website application that shows a map of the central business district of Wellington NZ, with some of the best places to eat and/or drink highlighted. Location data is sourced from a postgreSQL managed database and detailed venue information is accessed using [Foursquare](https://foursquare.com) API. Knockout is used to bind view to model enabling users to filter locations by type and click on locations to access more detailed information. 

Food on the Fault is hosted by Amazon Lightsail (here).

## Libraries and APIs
Application utilises the following: 
- Javascript
- Knockout 3.4.2
- jQuery
- Google Maps API
- Foursquare API
- Flask
- Python 2.7
- SQLalchemy
- psycopg2
- pip install psycopg2-binary

The Jquery and Knockout libraries are provided with the application.

### Set up Application --- This is going to be Difficult. 
### Give instructions for Localhosting. 
### Install PostgreSQL - Direct them to the documentation for that. 
(either install in a virtual environment or ... download and configure Udacity's Vagrant Machine???  Ummmm.
psql -U postgres -W
create user.
create db, user
connect to db
change ``` postgreSQL:user userpassword@localhost``` in file x. 
run setup_db
populate_db
__init__.py

Go to localhost:8000

Should hopefully be there. 
Clone or Download github repository: [Food on the Fault](https://github.com/antzie/Food-on-the-Fault)

#### Clone
Navigate to your local folder of choice
```
cd path/
```
```
$ git clone https://github.com/antzie/Food-on-the-Fault.git
```
### Run Project
Open map.html in your favourite browser.

## License.
See License MIT for details.
