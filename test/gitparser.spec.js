var assert = require("assert")
    ,should = require('should')
    ,GitParser = require('gitparser')
    ,payloadMaster = require('./mocks/payload-master.json')
    ,payloadDevelop = require('./mocks/payload-develop.json')
    ,parsedPayload
;
describe('GitParser - instances', function(){
    describe('push webhooks to develop -> parsedPayload = new GitParser(<payload>)', function(){
        before(function(){
            parsedPayload = new GitParser(payloadDevelop);
        })

        it('parsedPayload.payload is the original payload', function(){
            parsedPayload.should.have.property("payload").and.be.exactly(payloadDevelop);
        });

        it('parsedPayload.repo is "webhooks"', function(){
            parsedPayload.should.have.property("repo").and.be.exactly("webhooks");
        });

        it('parsedPayload.branch is "develop"', function(){
            parsedPayload.should.have.property("branch").and.be.exactly("develop");
        });

        it('parsedPayload.datetime is a Date', function(){
            parsedPayload.should.have.property("datetime").and.be.an.instanceOf(Date);
        });

        it('parsedPayload.urls has "ssh" and "clone" members', function(){
            parsedPayload.should.have.property("urls").and.have.properties("ssh","clone");

        });

        it('parsedPayload.added is an Array of strings', function(){
            parsedPayload.should.have.property("added").and.be.an.instanceOf(Array).and.matchEach(function(item) { return typeof item === "string"; });
        });

        it('parsedPayload.removed is an Array of strings', function(){
            parsedPayload.should.have.property("removed").and.be.an.instanceOf(Array).and.matchEach(function(item) { return typeof item === "string"; });
        });

        it('parsedPayload.modified is an Array of strings', function(){
            parsedPayload.should.have.property("modified").and.be.an.instanceOf(Array).and.matchEach(function(item) { return typeof item === "string"; });
        });
    });
});