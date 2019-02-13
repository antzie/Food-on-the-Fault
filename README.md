# Map of Wellington, NZ
A full-stack website application that shows a map of the central business district of Wellington NZ, with some excellent places to eat and/or drink highlighted. Users are able to filter locations by type and click on locations to access more detailed information. 

Location data is sourced from a postgreSQL managed database and venue information is accessed from [Foursquare](https://foursquare.com) API. 

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
- SQLAlchemy 1.2.17

### APIs
- Google Maps API
- Foursquare API

Jquery and Knockout are provided with the application.

## Installation
### Virtual Environment
You can use your own, or follow the below instructions to setup a Vagrant VM.
#### Requirements (for Virtual Environment)
- [Vagrant](https://www.vagrantup.com/)
- [Virtual Box](https://www.virtualbox.org/)

#### VM Installation
Download Virtual Box and Vagrant and install the platform packages for your operating system.

*Optional* you can supplement with Udacity's preconfigured VM settings from here:
[fullstack-nanodegree-vm](https://github.com/udacity/fullstack-nanodegree-vm.git)
``` 
git clone https://github.com/udacity/fullstack-nanodegree-vm.git
```

Change to the directory containing the VM files and change directory to the vagrant directory:
e.g. fsnd-virtual-machine\FSND-Virtual-Machine\vagrant.

Inside the vagrant subdirectory, start and login to the virtual machine.
``` 
$ vagrant up
$ vagrant ssh
```
Inside the VM, change directory to /vagrant 
```
$ cd /vagrant
```
### Application Setup 
Inside the VM clone "Food on the Fault":
```
$ git clone https://github.com/antzie/Food-on-the-Fault.git 
```
Open *setup_db.py*
``` 
$ nano setup_db.py
```
Change 'engine = create_engine' to
```
engine = create_engine('sqlite:///food.db')
```
Setup and populate database:
```
$ python setup_db.py
$ python populate_db.py
```

### Run Application
Still inside VM.
```
$ python __init__.py
```
Open in browser at [localhost](http://localhost:8000/)

Food on the Fault hosted at [food-on-the-fault](http://food-on-the-fault.com/)

## License.
See License MIT for details.
