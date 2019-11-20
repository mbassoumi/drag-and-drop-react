import React, {useState, useEffect} from 'react';
import initialData                  from './initial-data';
import Column                       from './components/Column';
import {DragDropContext}            from 'react-beautiful-dnd';

const App = () => {
    const [tasks, setTasks] = useState(initialData.tasks);
    const [columns, setColumns] = useState(initialData.columns);
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

    useEffect(() => {
        const newTasks = {};
        Array(4).fill(null).forEach((value, index) => {
            newTasks[`task-${index}`] = {
                id     : `task-${index}`,
                content: `TASK ${index}`,
            };
        });
        setTasks(newTasks);

        const newColumns = Object.assign({}, columns);
        newColumns[Object.keys(newColumns)[0]].taskIds = Array.of(...Object.keys(newTasks));

    }, []);

    const renderColumns = () => {
        return Object.keys(columns).map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => {
                return tasks[taskId];
            });
            return (
                <Column key={columnId} id={column.id} title={column.title} tasks={columnTasks}/>
            );
        });
    };

    const onDragStart = () => {

    };

    const onDragUpdate = () => {

    };

    const onDragEnd = (result) => {

        const destination = result.destination;
        const source = result.source;
        const taskId = result.draggableId;

        if (!destination || (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        )) {
            return;
        }

        const newColumns = Object.assign({}, columns);
        newColumns[source.droppableId].taskIds.splice(source.index, 1);
        newColumns[destination.droppableId].taskIds.splice(destination.index, 0, taskId);
        setColumns(newColumns);
    };

    return (
        <div className="App">
            <div>
                <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                >
                    {renderColumns()}
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
