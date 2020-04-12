var expect  = require('chai').expect;
var request = require('request');

describe('Basic test', function() {
    describe ('Default route', function() {
        it('status', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:3000/' , function(error, response, body) {
                expect(body).to.equal('Welcome to ticket booking system!');
                done();
            });
        });
    });

    describe ('arbitrary route', function() {
        it('status', function(done){
            request('http://localhost:3000/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

    });
});