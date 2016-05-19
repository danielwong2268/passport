var Boat = require('./controllers/Boat.controller.js');


module.exports = function(app) {
  // routes here

  app.post('/api/timeslots', Boat.createTimeslots);
  app.get('/api/timeslots', Boat.getTimeslots);
  app.post('/api/boats', Boat.createBoat);
  app.get('/api/boats', Boat.listBoat);
  app.post('/api/assignments', Boat.assignBoatToTimeSlot);
  app.post('/api/bookings', Boat.createBooking);

}