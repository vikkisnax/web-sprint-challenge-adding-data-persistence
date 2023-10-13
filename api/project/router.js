// build your `/api/projects` router here
const router = require('express').Router()
//model - add later
const Projects = require('./model')

router.get('/', (req, res, next)=>{
    Projects.getProject()
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