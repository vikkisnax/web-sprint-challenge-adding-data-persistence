// build your `/api/resources` router here

const router = require('express').Router()
//model - add after setup
const Resources = require('./model')


//doesn't return the list of resources when i have ids in here...
router.get('/:resource_id', (req, res, next)=>{
    Resources.getResourceById(req.params.resource_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

// so I made this to return all resources
// http :3000/api/resources 
router.get('/', async (req, res, next) => {
    Resources.getResource()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(next);
})

router.post('/', (req, res, next) => {
    console.log('req.body:', req.body)
    Resources.createResource(req.body)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(next);
})


//error handling mw bc no mw file 
router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the resources router',
        message:err.message,
        stack: err.stack,
    })
})


module.exports = router