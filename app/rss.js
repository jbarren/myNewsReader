exports.fetchRss = fetch;

var request = require('request')
    , FeedParser = require('feedparser');
function fetch(feed, callback) {
    var postList = [];
    var req = request(feed, {timeout: 30000, pool: false});
    req.setMaxListeners(50);
    // Some feeds do not respond without user-agent and accept headers.
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
    req.setHeader('accept', 'text/html,application/xhtml+xml');
    var feedparser = new FeedParser();
    req.on('error', function(e){
        console.log('Error on request', e);
    });
    req.on('response', function (res) {
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        res.pipe(feedparser);
    });
    feedparser.on('error', function(){
        console.log('Error on feedparser');
    });
    feedparser.on('end', function(){
        console.log('Feedparser end');
    });
    feedparser.on('readable', function () {
        var post;
        while (post = this.read()) {
            console.log(post);
            postList.push(post);
        }
        callback(postList);
    });
}
