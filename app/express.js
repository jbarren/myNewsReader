var express = require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path');
    rss = require('./rss');

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

var db = mongoskin.db('mongodb://@localhost:27017/test', {safe: true})

app.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName)
    return next()
})

app.get('/', function (req, res, next) {
    //res.send('please select a collection, e.g., /collections/messages')
    res.sendFile('/index.html');
})

app.get('/feed/:feedName', function (req, res, next) {
    var urlOfFeed;
    console.log('Feed', req.params.feedName, 'requested');
    if(req.params.feedName === 'meneame'){
       urlOfFeed ="https://www.meneame.net/rss";
    };
    rss.fetchRss(urlOfFeed, function(articleList){
       res.json(articleList);
    });
});

app.listen(3000, function () {
    console.log('Express server listening on port 3000')
});

