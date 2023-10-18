// build your `Resource` model here


//db wrapper
const db = require('../../data/dbConfig')

//writing this on my own bc i want to see a list of resources
async function getResource(){
    return db('resources')
}


// we want to return a response body with resource id, name, description
async function getResourceById(resource_id){
    const resourceRows = await db('resources as r')
        //to get specific project
        .where('r.resource_id', resource_id)
    return resourceRows;
}

async function createResource(resource){
    const [ resource_id ] = await db('resources').insert(resource);

    const newResource = await db('resources as r')
        .select('r.resource_id', 'r.resource_name', 'r.resource_description')
        .where('r.resource_id', resource_id)
        .first()

    return newResource;
}

module.exports = { getResource, getResourceById, createResource }