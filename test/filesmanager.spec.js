var assert = require("assert")
    ,should = require("should")
    ,FilesManager = require('filesmanager')
    ,GitParser = require('gitparser')
    ,payloadDevelop = require('./mocks/payload-develop.json')
    ,parsedPayload = new GitParser(payloadDevelop);
;

describe('FilesManager', function(){

    describe('Clone "webhooks" from git remote repo ->  FilesManager.git.clone(ssh,folder,branch,callback)', function(){
        it('repo is returned after cloning for "webhooks" at branch "develop"', function(done){
            this.timeout(15000);
            FilesManager.fs.deleteSync('../repos/webhooks');
            FilesManager.git.clone("git@github.com:mjzzanichelli/webhooks.git","webhooks","develop",function(repo){
                repo.should.be.an.instanceOf(Object);
                done();
            });
        });

        it('repo\'s path is set to "./repos/webhooks"', function(){
            FilesManager.git.repo("webhooks").path.should.be.exactly(FilesManager.git.path("webhooks"));
        });

        it('repo\'s branch is set to "develop"', function(done){
            this.timeout(15000);
            FilesManager.git.repo("webhooks").branch(function(err,branch){
                branch.name.should.be.exactly("develop");
                done();
            });
        });
    });

    describe('Clone from parse git payload ->  FilesManager.git.clone(payload,callback)', function(){
        it('repo is returned after cloning for "webhooks" at branch "develop"', function(done){
            this.timeout(15000);
            FilesManager.fs.deleteSync('../repos/webhooks');
            FilesManager.git.clone(parsedPayload,function(repo){
                repo.should.be.an.instanceOf(Object);
                done();
            });
        });

        it('repo\'s path is set to "./repos/webhooks"', function(){
            FilesManager.git.repo("webhooks").path.should.be.exactly(FilesManager.git.path("webhooks"));
        });

        it('repo\'s branch is set to "develop"', function(done){
            this.timeout(15000);
            FilesManager.git.repo("webhooks").branch(function(err,branch){
                branch.name.should.be.exactly("develop");
                done();
            });
        });
    });

    describe('Pull "webhooks" from git remote repo ->  FilesManager.git.sync(folder,branch,callback)', function(){
        it('repo is returned after syncing "webhooks" at branch "develop"', function(done){
            this.timeout(15000);
            FilesManager.git.sync("webhooks","develop",function(repo){
                repo.should.be.an.instanceOf(Object);
                done();
            });
        });

        it('repo\'s branch is set to develop', function(done){
            this.timeout(15000);
            FilesManager.git.repo("webhooks").branch(function(err,branch){
                branch.name.should.be.exactly("develop");
                done();
            });
        });
    });

    describe('Switch "webhooks" local branch ->  FilesManager.git.switch(folder,branch,callback)', function(){
        it('repo is returned after switching for "webhooks" to "master"', function(done){
            this.timeout(15000);
            FilesManager.git.switch("webhooks","master",function(repo){
                repo.should.be.an.instanceOf(Object);
                done();
            });
        });

        it('repo\'s branch is set to "master"', function(done){
            this.timeout(15000);
            FilesManager.git.repo("webhooks").branch(function(err,branch){
                branch.name.should.be.exactly("master");
                done();
            });
        });
    });
});