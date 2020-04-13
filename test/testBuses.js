process.env.DB_CONNECTION = "mongodb://localhost/test";

let mongoose = require("mongoose");
let buses = require('../models/bus');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app').app;
let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);
//Our parent block
describe('buses', () => {
    beforeEach((done) => { //Before each test we empty the database
        buses.remove({}, (err) => { 
           done();           
        });        
    });

describe('/GET buses', () => {
    it('it should GET all the buses', (done) => {
        chai.request(server)
            .get('/bus/search')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

describe('/POST buses', () => {
    it('it should add bus', (done) => {
        let bus = {
                "noofseats": 40,
                "start_time":"2020-01-08T10:00",
                "end_time":"2020-01-08T16:00",
                "start_station":"Delhi",
                "end_station":"Jaipur"
        }
        chai.request(server)
          .post('/bus/add')
          .send(bus)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.bus.should.have.property('_id');
                expect(res.body.bus.start_station).to.equal(bus['start_station']);
              done();
          });
    });

});