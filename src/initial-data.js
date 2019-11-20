const initialData = {
    tasks      : {
        'task-1': {
            id     : 'task-1',
            content: 'Init react app',
        },
        'task-2': {
            id     : 'task-2',
            content: 'open php storm',
        },
        'task-3': {
            id     : 'task-3',
            content: 'run npm start',
        },
        'task-4': {
            id     : 'task-4',
            content: 'wow! it is running',
        },
    },
    columns    : {
        'column-1': {
            id     : 'column-1',
            title  : 'To do 1',
            taskIds: ['task-1', 'task-2', 'task-4', 'task-3']
        },
        'column-2': {
            id     : 'column-2',
            title  : 'To do 2',
            taskIds: []
        }

    },
    columnOrder: ['column-1']
};

export default initialData;