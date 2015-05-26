var fs=require("fs")
    ,path = require("path")
    ,git = require("gift")
    ,rimraf = require("rimraf")
    ,rootPath = path.join(__dirname,"..","..")
    ,reposFolder = "repos"
;

var getFromPayload = function(payload,name,branch,callback){
    if (payload instanceof Object && payload.urls && payload.urls.ssh && payload.repo && payload.branch) return [payload.urls.ssh,payload.repo,payload.branch,name];
    return [payload,name,branch,callback];
}

var getBasePath = function(name){
    if (name) return getRepoPath(name);
    return path.join(rootPath,reposFolder);
}

var getRepoPath = function(name){
    return path.join(rootPath,reposFolder,name);
}

var getRepo = function(name){
    return git(getRepoPath(name));
}

var switchRepo = function(name,branch,callback){
    callback = callback || function(){};
    repo = getRepo(name);
    repo.checkout(branch,function(err) {
        if (!err) return callback(repo);
    });
}

var syncRepo = function(name,branch,callback){
    callback = callback || function(){};
    switchRepo(name,branch,function(repo){
        return repo.sync("origin",branch,function(err){
            if (!err) return callback(repo);
        });
    });
};

var cloneRepo = function(ssh,name,branch,callback){
    config = getFromPayload.apply(null,arguments);
    ssh = config[0];
    name = config[1];
    branch = config[2];
    callback = config[3] || function(){};
    git.clone(ssh, getRepoPath(name), function(err){
        if (err) return syncRepo(name,branch,callback);
        return switchRepo(name,branch,callback)
    });
};

FilesManager = {
    fs: {
        delete:rimraf,
        deleteSync:rimraf.sync
    },
    git:{
        clone:cloneRepo,
        sync:syncRepo,
        switch:switchRepo,
        repo:getRepo,
        path:getBasePath
    }
}

module.exports = FilesManager;