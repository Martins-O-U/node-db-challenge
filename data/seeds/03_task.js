
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').truncate()
  .then(function () {
    return knex('task').insert([
      {id:"1", description: 'Put clothes into the laundry machine and time it', notes: 'clothes to be washed by the machine', project_id: 1},
      {id:"2", description: 'Sun dry the clothes after wash ', notes: "", project_id: 1},
      {id:"3", description: 'Get to the market to purchase a new dog leash', notes: 'A long leash is good', project_id: 2},
      {id:"4", description: 'Invite labourers for job negotiation', notes: 'important for budget', project_id: 4},
      {id:"5", description: 'Purchase drums of paints and bunch of flowers', notes: 'A beatiful home give peace of mind', project_id: 4},
      {id:"6", description: 'Feed andbathe the dog ontime', notes: 'early to bed early to rise', project_id: 2},
      {id:"7", description: 'call friends to book a day', notes: 'imports for proper planning', project_id: 3},
      {id:"8", description: 'Purchase books and videos on Node.JS', notes: 'no work no reward', project_id: 5},
      {id:"9", description: 'get home early to prepare self for the dinner', notes: '', project_id: 3},
      {id:"10", description: 'Be seated by 5 to ensure enough time for coding practice', notes: '', project_id: 5}

    ]);
  })
};
