// build your `Task` model here

//db wrapper
const db = require('../../data/dbConfig')

//writing this on my own bc i want to see a list of tasks
async function getTask(){
    const taskRows = await db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select(
        // 't.task_id',
        't.task_description',
        't.task_notes',
        't.task_completed',
        'p.project_name',
        'p.project_description'
    )
return taskRows;
}

// we want to return a response body with task id, name, description
async function getTaskById(task_id){
    const taskRows = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
        .where('t.task_id', task_id)
    return {
        taskRows,
        task_completed: Boolean(taskRows.task_completed)
    }; // Convert to boolean
}

async function createTask(task){
    if (!task.task_description) {
        throw new Error('Task description is required.');
    }
    if (!task.project_id || isNaN(task.project_id)) {
        throw new Error('Invalid project ID.');
    }

    const [ task_id ] = await db('tasks').insert(task);

    const newTask = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id', 
            't.task_description', 
            't.task_notes', 
            't.task_completed',
            'p.project_id'
            )
        .where('t.task_id', task_id)
        .first();

        return {
            ...newTask,
            task_completed: Boolean(newTask.task_completed) // Convert to boolean
          };
}

module.exports = { getTask, getTaskById, createTask }