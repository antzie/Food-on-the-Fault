# Map of Wellington, NZ (README under Construction)
A Flask website application that shows a map of the central business district of Wellington NZ, with some excellent venues to eat and/or drink marked. Users are able to filter venues by type, and access detailed infomation for each venue.  

Location data is sourced from a postgreSQL managed database and venue information is accessed from [Foursquare](https://foursquare.com) API. [Knockout](https://knockoutjs.com/) (MVVM) is employed to bind elements.

Food on the Fault is hosted by Amazon Lightsail [Food-on-the-Fault](http://food-on-the-fault.com/).

## Requirements
- Javascript
- Python 2.7
- Knockout 3.4.2
- jQuery
- PostgreSQL 9.5

### Python Libraries
Assumes the following python libraries are installed.
- Flask 1.0.2
- SQLAlchemy==1.2.17

### APIs
- Google Maps API
- Foursquare API

Jquery and Knockout are provided with the application.

## Installation
### Option 1 -- Virtual Environment
#### Requirements (for Virtual Environment)
- [Vagrant](https://www.vagrantup.com/)
- [Virtual Box](https://www.virtualbox.org/)
- [PostgreSQL](https://www.postgresql.org/) - (Optional)

#### VM Installation
Download Virtual Box and Vagrant and install the platform packages for your operating system.

You can download and setup PostgreSQL on the VM yourself [PostgreSQL](https://www.postgresql.org/) and useful [blog post](http://grismar.net/2011/07/22/virtualbox_running_postgresql/)

OR you can use Udacity's preconfigured VM settings from here:
[fullstack-nanodegree-vm](https://github.com/udacity/fullstack-nanodegree-vm.git)

Change to directory containing the VM files and change directory to the vagrant directory:
e.g. fsnd-virtual-machine\FSND-Virtual-Machine\vagrant

Inside the vagrant subdirectory:
Start the virtual machine
``` 
vagrant up
vagrant ssh
```
#### PostgreSQL



From your terminal, inside the vagrant subdirectory, run the command vagrant up. 

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
