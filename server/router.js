var Boat = require('./controllers/Boat.controller.js');


module.exports = function(app) {
  // routes here

  app.post('/api/createTimeSlot', Boat.createTimeSlot);
  app.get('/api/listTimeSlots', Boat.listTimeSlots);
  app.post('/api/createBoat', Boat.createBoat);
  app.get('/api/listBoat', Boat.listBoat);
  app.post('/api/assignBoatToTimeSlot', Boat.assignBoatToTimeSlot);
  app.post('/api/createBooking', Boat.createBooking);

}