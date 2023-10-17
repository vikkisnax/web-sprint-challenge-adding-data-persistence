// build your `Project` model here

//db wrapper
const db = require('../../data/dbConfig')

//writing this on my own bc i want to see a list of projects
async function getProject(){
    return db('projects')
}


// we want to return a response body with project id, name, description, completed
async function getProjectById(project_id){
    const projectRows = await db('projects as p')
        //to get specific project
        .where('p.project_id', project_id)
    return projectRows;
}

async function createProject(project){
    const [ project_id ] = await db('projects').insert(project);

    const newProject = await db('projects as p')
        .select('p.project_id', 'p.project_name', 'p.project_description', 'p.project_completed')
        .where('p.project_id', project_id)
        .first()

    return newProject;
}

module.exports = { getProject, getProjectById, createProject }