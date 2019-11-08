

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Do laundaries', description: "Wash off dirts on cloths"},
        {id: 2, name: 'walk dog', description: "go to the city park and walk for an hour"},
        {id: 3, name: 'Dinner', description: "Have dinner with friends"},
        {id: 4, name: 'Redecoration', description: "Repaint the houseandreplace flowers"},
        {id: 5, name: 'Practice coding', description: "Few hours of coding on today"}
      ]);
    });
};
