var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));


app.get('/', function(req, res) {
	res.render('homepage');
});

app.get('/homepage',function(req,res){
    var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.907610, lng: -77.039288},
    zoom: 8
  });
}
	res.render('homepage');
});
app.get('/key',function(req,res){
	res.render('key');
});
app.get('/basics',function(req,res){
        var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.907610, lng: -77.039288},
    zoom: 8
  });
}
	res.render('basics');
});
app.get('/features',function(req,res){
	res.render('features');
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
