// build your `/api/projects` router here
const router = require('express').Router()
//model - add after setup
const Projects = require('./model')

// router.get('/', (req, res, next)=>{
//     Projects.getProjectById()
//     .then(resource => {
//         res.status(200).json(resource)
//     })
//     .catch(next)
// })

//doesn't return project list when i have ids in here...
router.get('/:project_id', (req, res, next)=>{
    Projects.getProjectById(req.params.project_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
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