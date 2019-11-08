
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resource').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resource').insert([
        {id: 1, name: "Home", description: "This project can be carried out from home"},
        {id: 2, name: "Market", description: "This project require a visit to the market place for some purchases"},
        {id: 3, name: "labourers", description: "This requires additional hands as i can't doit all alone"},
        {id: 4, name: "Cab Driver", description: "This requires being driven to a location"},
        {id: 5, name: "Computer and Internet", description: "This requires a PC and an Internet connection"},
        {id: 6, name: "Friends", description: "Of course dinner with loved ones is the best"},
        {id: 7, name: "Park", description: "A location to walk the dog"}       
      ]);
    });
};
