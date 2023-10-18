const projects = [
  { project_name: 'Watercolors', 
    project_description: 'Ideas: flower, fruit...', 
    project_completed: true
  },
  { project_name: 'Crochet', 
    project_description: 'Ideas: coaster, blanket...', 
    project_completed: true
  }
]

const resources = [
  //Watercolors
  { resource_name: 'Paintbrushes', 
    resource_description: 'Small, medium, and large round brushes.' 
  },
  { resource_name: 'Watercolor Palette', 
    resource_description: 'Twelve color watercolor palette.' 
  },
  { resource_name: 'Water',
    resource_description: 'Fresh water.'
  },
  //Crochet
  { resource_name: 'Ball of Yarn',
    resource_description: 'At least one ball of worsted weight yarn.'
  },
  { resource_name: 'Hook',
    resource_description: '5mm hook size.'
  }
  //don't need project_id fk bc we made another table with resources and projects
]

const tasks = [
  //Watercolors
  { task_description: 'Do foo',
    task_notes: null,
    task_completed: false,
    project_id: 1
  },
  { task_description: 'Do bar',
    task_notes: 'Use Postman!',
    task_completed: false,
    project_id: 1 
  },
  //Crochet
  { task_description: 'Do baz',
    task_notes: 'Have fun!',
    task_completed: true,
    project_id: 2
  },
  // { task_description: 'Stick your hook inside the ball of yarn if you did not finish or fasten off your project if you did.',
  //   task_notes: 'Don\'t let your pet get to it!',
  //   task_completed: false,
  //   project_id: 2
  // }
  //fk will be project_id ^
]

//project resources table 
const project_resources = [
  //Watercolors
  { project_id: 1, resource_id: 1 },
  { project_id: 1, resource_id: 2 },
  { project_id: 1, resource_id: 3 },
  //Crochet
  { project_id: 2, resource_id: 1 },
  { project_id: 2, resource_id: 2 },
]


exports.seed = async function(knex) {
  await knex('projects').insert(projects)
  await knex('resources').insert(resources)
  await knex('tasks').insert(tasks)
  await knex('project_resources').insert(project_resources)
};