// build your `/api/projects` router here
const router = require('express').Router()
//model - add after setup
const Projects = require('./model')


//doesn't return the list of projects when i have ids in here...
router.get('/:project_id', (req, res, next)=>{
    Projects.getProjectById(req.params.project_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

// so I made this to return all projects
// http :3000/api/projects 
router.get('/', async (req, res, next) => {
    Projects.getProject()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
})

router.post('/', (req, res, next) => {
    console.log('req.body:', req.body)
    Projects.createProject(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next);
})


//error handling mw bc no mw file 
router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the recipes router',
        message:err.message,
        stack: err.stack,
    })
})


module.exports = router