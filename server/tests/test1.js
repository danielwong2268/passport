var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('superagent');

describe('test1, extended', () => {
  it('should create two time slots - test POST/GET to /api/timeslots', function(done) {

    request
      .post('http://localhost:3000/api/timeslots')
      .send({'timeslot[start_time]':1406052000, 'timeslot[duration]': 120})
      .end( (err,res) => {
        request
          .post('http://localhost:3000/api/timeslots')
          .send({'timeslot[start_time]':1406055000, 'timeslot[duration]': 120})
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

  it('should add two boats - test POST/GET to /api/boats', (done) => {
    request
      .post('http://localhost:3000/api/boats')
      .send({'boat[capacity]': 8, 'boat[name]': 'boat1'})
      .end( (err, res) => {
        request
          .post('http://localhost:3000/api/boats')
          .send({'boat[capacity]': 4, 'boat[name]': 'boat2'})
          .end( (err, res) => {
            request
              .get('http://localhost:3000/api/boats')
              .end( (err, res) => {
                expect(res.body.length).to.equal(2);
                done();
              })
          })
      })
  })

  it('should assign both created boats to timeslot1 - test POST to /api/assignments', (done) => {
    request
      .post('http://localhost:3000/api/assignments')
      .send({'assignment[timeslot_id]': 'timeslot1', 'assignment[boat_id]':'boat1'})
      .end( (err, res) => {
        request
          .post('http://localhost:3000/api/assignments')
          .send({'assignment[timeslot_id]': 'timeslot1', 'assignment[boat_id]':'boat2'})
          .end( (err, res) => {
            request
              .get('http://localhost:3000/api/timeslots?date=2014-07-22')
              .end( (err, res) => {
                var timeslot1 = res.body.filter( (timeslot) => {
                  return timeslot.id === 'timeslot1';
                })[0];
                expect(timeslot1.boats.length).to.equal(2);
                done();
              })
          })
      })
  })

  it('expect both boats to have timeslot1 in their timeslot object', (done) => {
    request
      .get('http://localhost:3000/api/boats')
      .end( (err, res) => {
        res.body.forEach( (boat) => {
          expect(boat.timeslots['timeslot1']).to.equal('timeslot1');
        })
        done();
      })
  })

  it(`should assign a group of 6 to the larger boat (boat1), changing timeslot
      availability to 4 and customer count to 6`, (done) => {
    request
      .post('http://localhost:3000/api/bookings')
      .send({'booking[timeslot_id]': 'timeslot1', 'booking[size]': 6})
      .end( (err, res) => {
        request
          .get('http://localhost:3000/api/timeslots?date=2014-07-22')
          .end( (err, res) => {
            var timeslot1 = res.body.filter( (timeslot) => {
              return timeslot.id === 'timeslot1';
            })[0];
            expect(timeslot1.availability).to.equal(4);
            expect(timeslot1.customer_count).to.equal(6);
            done();
          })
      })
  })

  it ('should not be able to book a tour that is too large', (done) => {
    request 
      .post('http://localhost:3000/api/bookings')
      .send({'booking[timeslot_id]': 'timeslot1', 'booking[size]': 1000})
      .end( (err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.error).to.equal('We cannot accomodate this boat at this time');
        done();
      })
  })
    


})  
