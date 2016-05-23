var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('superagent');

var server = require('../server.js');

describe( 'test2', () => {

  it('should create two time slots 1000 seconds apart - test POST/GET to /api/timeslots', (done) => {
    request
      .post('http://localhost:3000/api/timeslots')
      .send({'timeslot[start_time]':1406052000, 'timeslot[duration]': 120})
      .end( (err,res) => {
        request
          .post('http://localhost:3000/api/timeslots')
          .send({'timeslot[start_time]':1406053000, 'timeslot[duration]': 120})
          .end( (err,res) => {
            request
              .get('http://localhost:3000/api/timeslots?date=2014-07-22')
              .end( (err, res) => {
                expect(res.body.length).to.equal(2);
                done();
              })   
          })
      })
  })

  it('should be able to add a boat - test POST/GET to /api/boats', (done) => {
    request
      .post('http://localhost:3000/api/boats')
      .send({'boat[capacity]': 8, 'boat[name]': 'boat1'})
      .end( (err, res) => {
        request
          .get('http://localhost:3000/api/boats')
          .end( (err, res) => {
            expect(res.body.length).to.equal(1);
            done();
          })
      })
  })

it('should assign boat1 to both time slots', (done) => {
    request
      .post('http://localhost:3000/api/assignments')
      .send({'assignment[timeslot_id]': 'timeslot1', 'assignment[boat_id]':'boat1'})
      .end( (err, res) => {
        request
          .post('http://localhost:3000/api/assignments')
          .send({'assignment[timeslot_id]': 'timeslot2', 'assignment[boat_id]':'boat1'})
          .end( (err, res) => {
            request
              .get('http://localhost:3000/api/timeslots?date=2014-07-22')
              .end( (err, res) => {
                res.body.forEach( (timeslot) => {
                  expect(timeslot.boats[0]).to.equal('boat1');
                })
                done();
              })
          })
      })
  })

  it('should book timeslot1 for boat1, for a group of 6', () => {
    request 
      .post('http://localhost:3000/api/bookings')
      .send({'booking[timeslot_id]': 'timeslot1', 'booking[size]': 6})
      .end( (err, res) => {
        request
          .get('http://localhost:3000/api/timeslots?date=2014-07-22')
          .end( (err, res) => {
            expect(res.body.filter( (timeslot) => {
              return timeslot.id === 'timeslot1';
            }))[0].availability.to.equal(2);
          })
      })


  })

  it('boat1 should not be available for timeslot2', () => {

  })





})





