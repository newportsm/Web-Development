var db = require('./mysql.js');
var request = require('request');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));


app.get('/reset-table',function(req,res,next){
  var context = {};
  console.log("Received a table reset command.");
  db.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    db.pool.query(createString, function(err){
      context.results = "Table reset.";
      res.send(context);
    })
  });
});


app.get('/select',function(req,res,next){
	var context = {} ;
	if (req.query.id != null) {
		db.pool.query('SELECT * from workouts WHERE id=?', [req.query.id], function(err, rows, fields){
			if(err){
				next(err);
				return;
			}
			context = JSON.stringify(rows);
			console.log("Context: " + context);
			console.log("Entries: " + rows.length);
			res.send(context);
		});
	}

	else {
			db.pool.query('SELECT * from workouts', function(err, rows, fields){
				if(err){
					next(err);
					return;
				}

			context = JSON.stringify(rows);
			console.log("Context: " + context);
			console.log("Entries: " + rows.length);
			res.send(context);
			
		});
	}
});


app.get('/insert',function(req,res,next){
	var context = {};
	console.log("received: " + req.query.name + ", " + req.query.reps + ", " + req.query.weight + ", " + req.query.date + ", " + req.query.lbs);
	db.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
		next(err);
		return;
    }
    context.id = result.insertId;
	console.log("Added id: " + context);
	res.send(JSON.stringify(context));
  });
});



app.get('/delete',function(req,res,next){
	var context = {};	
	console.log("Received a delete for row " + req.query.id);
	db.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
		next(err);
		return;
    }
    context = "Deleted row " + result.insertId;
	res.send(context);
  });
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});