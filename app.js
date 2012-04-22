var Pusher = require('node-pusher');
var pusher = new Pusher({
  appId: '19117',
  key: 'fbe539c0f8d3422f66ee',
  secret: 'f01f80437ce29c37898d'
});

var express = require('express');
var routes  = require('./routes');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('view engine', 'jade');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes
app.get('/', routes.index);
app.get('/pong', routes.pong);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
