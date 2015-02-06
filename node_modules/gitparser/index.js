var mergeUnique = function(arr1,arr2){
    var arr = arr1.concat(arr2)
    return arr.filter(function(item,pos){return arr.indexOf(item)==pos;});
}

var getCommitsFiles = function(member){
    return mergeUnique.apply(this,this.commits.map(function(item){ return item[member]}));
}

var GitParser = function(payload){
    this.payload = payload;
    this.repo = payload.repository.name;
    this.branch = payload.ref.split("/").pop();
    this.datetime = new Date(payload.head_commit.timestamp);
    this.urls = {
        ssh: payload.repository.ssh_url,
        clone: payload.repository.clone_url
    };
    this.added = getCommitsFiles.call(payload,"added");
    this.removed = getCommitsFiles.call(payload,"removed");
    this.modified = getCommitsFiles.call(payload,"modified");
};



module.exports = GitParser;