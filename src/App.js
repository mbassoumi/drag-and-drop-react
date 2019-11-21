import React, {useState, useEffect} from 'react';
import initialData from './initial-data';
import Column from './components/Column';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    border: 1px solid lightgrey;
    padding: 4px;
    margin: 10px;
`;

const App = () => {
    console.log('mounted');
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
        return columnOrder.map((columnId, columnIndex) => {
            console.log(columnId, columnIndex);
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => {
                return tasks[taskId];
            });
            const isDropDisabled = !allowedDroppable.includes(columnId);
            return (
                <Draggable
                    key={columnIndex}
                    draggableId={columnId}
                    index={columnIndex}
                >
                    {
                        (provided, snapshot) => (
                            <Column key={columnId}
                                    id={column.id}
                                    title={column.title}
                                    tasks={columnTasks}
                                    draggableProvided={provided}
                                    draggableSnapshot={snapshot}
                                    isDropDisabled={isDropDisabled}
                            />
                        )
                    }
                </Draggable>
            );
        });
    };

    const onDragStart = (result) => {
        console.log('onDragStart', result);
        const type = result.type;
        switch (type.toUpperCase()) {
            case 'TASK':
                const taskId = result.draggableId;
                setAllowedDroppable(tasks[taskId].allowedParent);
                break;
            case 'COLUMN':
            default:
                break;
        }
    };

    const onDragUpdate = (result) => {
        console.log('onDragUpdate', result);
    };

    const onDragEnd = (result) => {

        setAllowedDroppable([]);

        const destination = result.destination;
        const source = result.source;

        if (!destination || (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        )) {
            return;
        }

        const type = result.type;
        switch (type.toUpperCase()) {
            case 'TASK':
                dragTask(result);
                break;
            case 'COLUMN':
                dragColumn(result);
                break;
            default:
                break;
        }

    };

    const dragColumn = (result) => {
        const columnId = result.draggableId;
        const source = result.source;
        const destination = result.destination;
        const newColumnOrder = Array.from(columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, columnId);
        setColumnOrder(newColumnOrder);
    };

    const dragTask = (result) => {

        const destination = result.destination;
        const source = result.source;
        const taskId = result.draggableId;

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
                    <Droppable
                        type="COLUMN"
                        droppableId='my-column-container'
                        direction="horizontal"
                    >
                        {
                            (provided, snapshot) => (
                                <Container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {renderColumns()}
                                    {provided.placeholder}
                                </Container>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
