import React, {useState, useEffect} from 'react';
import initialData from './initial-data';
import Column from './components/Column';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from "styled-components";


const Container = styled.div`
    display: flex;
`;

const App = () => {
    const [tasks, setTasks] = useState(initialData.tasks);
    const [columns, setColumns] = useState(initialData.columns);
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
    const [allowedDroppable, setAllowedDroppable] = useState([]);

    useEffect(() => {
        const newTasks = {};
        Array(10).fill(null).forEach((value, index) => {
            const columnIndex = (index % 3) + 1;
            const secondColumnIndex = ((columnIndex + 1) % 3) + 1;
            newTasks[`task-${index}`] = {
                id: `task-${index}`,
                content: `TASK ${index}`,
                allowedParent: [`column-${columnIndex}`, `column-${secondColumnIndex}`]
            };
        });
        setTasks(newTasks);

        const newColumns = Object.assign({}, columns);
        newColumns[Object.keys(newColumns)[0]].taskIds = Array.of(...Object.keys(newTasks));

        // eslint-disable-next-line
    }, []);

    const renderColumns = () => {
        return columnOrder.map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => {
                return tasks[taskId];
            });
            const isDropDisabled = !allowedDroppable.includes(columnId);
            return (
                <Column key={columnId}
                        id={column.id}
                        title={column.title}
                        tasks={columnTasks}
                        isDropDisabled={isDropDisabled}
                />
            );
        });
    };

    const onDragStart = (result) => {
        // console.log('onDragStart', result);
        const taskId = result.draggableId;
        setAllowedDroppable(tasks[taskId].allowedParent);
    };

    const onDragUpdate = (result) => {
        console.log('onDragUpdate', result);
    };

    const onDragEnd = (result) => {

        setAllowedDroppable([]);

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
                    <Container>
                        {renderColumns()}
                    </Container>
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
