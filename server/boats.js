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