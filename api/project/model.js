
// build your `Project` model here

//db wrapper
const db = require('../../data/dbConfig')


// we want to return a response body with project id, name, description, completed
async function getProjectById(project_id){
    const projectRows = await db('projects as p')
        // .select(
        //     'p.project_id', 
        //     'p.project_name',
        //     'p.project_description',
        //     'p.project_completed'
        // )
        //to get specific project
        .where('p.project_id', project_id)
    return projectRows;
}


module.exports = { getProjectById }