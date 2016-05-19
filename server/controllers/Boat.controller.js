// contains the api endpoints for the Boat Tour

module.exports = {
  createTimeslots: (req, res) => {
    // expect start_time (Unix timestamp) and duration (minutes)
    console.log(req.body);
    res.send({foo: 'barybar'});

    // output example:
    /*
      { id: abc123,
        start_time: 1406052000,
        duration: 120,
        availability: 0, 
        customer_count: 0, 
        boats: [] }
    */
  },

  getTimeslots: (req, res) => {
    // expect date (YYYY-MM-DD)

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