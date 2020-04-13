process.env.DB_CONNECTION = "mongodb://localhost/test";

let mongoose = require("mongoose");
let users = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app').app;
let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        users.remove({}, (err) => { 
           done();           
        });        
    });

describe('/GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/user/search')
            .auth('admin','secret')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

describe('/POST users', () => {
    it('it should not add user without email', (done) => {
        let user = {
            name: "Shivank",
            mob: "7985684018"
        }
        chai.request(server)
          .post('/user/add')
          .auth('admin','secret')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                expect(res.body.message.name).to.equal('ValidationError');
              done();
          });
    });

});

describe('/POST users', () => {
    it('it should add user', (done) => {
        let user = {
            name: "Shivank",
            email: "shivankpathak357@gmail.com",
            mob: "7985684018"
        }
        chai.request(server)
          .post('/user/add')
          .auth('admin','secret')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.user.should.have.property('_id');
                expect(res.body.user.name).to.equal(user['name']);
              done();
          });
    });

});