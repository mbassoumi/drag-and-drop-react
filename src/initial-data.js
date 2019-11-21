const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            content: 'Init react app',
            allowedParent: ['column-1', 'column-2'],
        },
        'task-2': {
            id: 'task-2',
            content: 'open php storm',
            allowedParent: ['column-1', 'column-3'],
        },
        'task-3': {
            id: 'task-3',
            content: 'run npm start',
            allowedParent: ['column-1'],
        },
        'task-4': {
            id: 'task-4',
            content: 'wow! it is running',
            allowedParent: ['column-1', 'column-2', 'column-3'],
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-4', 'task-3']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        }

    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;