var Boats = {
  byId: {},
  create: ( () => {
    var count = 1;
    return function(capacity, name) {
      this.id = 'boat' + count;
      this.name = name;
      this.capacity = capacity;
      this.timeslots = {};
      count++;
    }
  })()


}

module.exports = Boats;



// store the time intervals in an array
// when booking a timeslot, check all other timeslots (linear time);
// to see if there is a time conflict 
  // if time conflict, then edit those time slots availability


// option 2: store the conflicts for each time slot, like a graph
// when inserting a new time slot, you will need to check all other
// intervals to see if there is a conflict



// compare the greater start time with the lesser end time
// if the start time is before the end time, then theres a conflict

