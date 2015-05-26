var express = require('express')
    ,BodyParser = require('body-parser')
    ,GitParser = require('gitparser')
    ,jsonParser = BodyParser.json()
    ,FilesManager = require('filesmanager')
;

var setAppMethods = function(app){
    app.post('/', jsonParser, function (req, res) {
        var gitPayload = new GitParser(req.body);
        FilesManager.git.clone(gitPayload,function(repo){
            console.log(repo)
        })
        //console.log(gitPayload.added,gitPayload.modified,gitPayload.removed)
        res.send();
    });
};

var WebHooks = function(port){
    this.app = express();
    this.port = port;
    setAppMethods(this.app);
    this.start();
};

WebHooks.prototype.start = function(port){
    this.port = port || this.port
    if (!this.port) return false;
    var _self = this;
    this.server = this.app.listen(this.port, function () {
        console.log('Webhooks Server listening at http://%s:%s', this.server.address().address, this.server.address().port)
    }.bind(this))
}

module.exports = WebHooks;