# dff.carmen-api

## Server setup
See https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/ for reference.

 1. Add repro key
 
 `$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927`

 2. Create the /etc/apt/sources.list.d/mongodb-org-3.2.list list file using the command appropriate for your version of Ubuntu. E. g.:

 `$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list`
 
 1. Install the latest stable version of MongoDB
 
 `$ sudo apt-get install -y mongodb-org`

 1. Start MongoDB
 
 `$ sudo service mongod start`
 
 or
 
 `$ sudo systemctl enable mongod.service`
 `$ sudo systemctl start mongod.service`
 
## MongoDB

See for reference:
 - https://docs.mongodb.com/manual/tutorial/enable-authentication/
 - https://docs.mongodb.com/manual/administration/configuration/
 
### create admin user
 
```js
use admin
db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```
 
### create carmen user
  
```js
use carmen
db.createUser({
    user: "carmen",
    pwd: "carmen",
    roles: [ { role: "readWrite", db: "carmen" } ]
  })
```

### enable authentication
 
`$ sudo vi /etc/mongod.conf`
 
  
```yaml
security:
  authorization: enabled
 ```
 
### bind network interfaces

`$ sudo vi /etc/mongod.conf`

Use your servers ip e. g.:

```yaml
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1,192.168.178..20
```
  
### restart mongo service
 
 `$ sudo service mongod restart`
 
 or
 
 `$ sudo systemctl start mongod.service`
