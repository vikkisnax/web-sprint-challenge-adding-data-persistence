// build your `/api/tasks` router here

const router = require('express').Router()
//model - add after setup
const Tasks = require('./model')



// I made this to return all tasks
// http :3000/api/tasks 
router.get('/', async (req, res, next) => {
    Tasks.getTask()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(next);
})


//doesn't return the list of tasks when i have ids in here...
router.get('/:task_id', (req, res, next)=>{
    Tasks.getTaskById(req.params.task_id)
    .then(task => {
        res.status(200).json(task)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('req.body:', req.body)
        const { task_description, project_id } = req.body;
    
        // Validate task data
        if (!task_description) {
          return res.status(400).json({ error: 'Task description is required.' });
        }
        if (!project_id || isNaN(project_id)) {
          return res.status(400).json({ error: 'Invalid project ID.' });
        }
    
    Tasks.createTask(req.body)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next);
})


//error handling mw bc no mw file 
router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the tasks router',
        message:err.message,
        stack: err.stack,
    })
})


module.exports = router