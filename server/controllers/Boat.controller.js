// contains the api endpoints for the Boat Tour

// store the data:
// store id, start time, , boats, availability, customer_count 

// this stores ID as key, for lookup by ID
var timeSlotsById = {};
// this stores timeslots with the day as key, in YYYY-MM-DD format
var timeSlotsByDate = {};


var Timeslot = ( () => {
  var count = 1;
  return function(startTime, duration) {
    this.start_time = startTime;
    this.id = 'timeslot' + count;
    this.boats = [];
    this.availability = 0;
    this.customer_count = 0;
    count++;
  }
})();


module.exports = {
  createTimeslots: (req, res) => {
    var start = req.body['timeslot[start_time]'];
    var duration = req.body['timeslot[duration]'];

    var timeSlot = new Timeslot(start, duration);

    // convert start time to date format
    var date = new Date(start * 1000),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth()+1,
        day = date.getUTCDate();
    var formattedDate = year + '-' + month + '-' + day;

    timeSlotsById[timeSlot.id] = timeSlot;
    timeSlotsByDate[formattedDate] = timeSlot;

    res.send(timeSlot);
  },

  getTimeslots: (req, res) => {

  },

  createBoat: (req, res) => {

  },

  listBoat: (req, res) => {

  },

  assignBoatToTimeSlot: (req, res) => {

  },

  createBooking: (req, res) => {

  }
}