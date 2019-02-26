var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const env = require('./app/config/env.js');

app.use(bodyParser.json())
 
require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;

const force = false;
// force: true will drop the table if it already exists
	db.sequelize.sync({force: force}).then(() => {
  console.log('Drop and Resync with force :', force);
  if(force){
    initial();
	}
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
const port = process.env.PORT || 3000;
var server = app.listen(port, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}