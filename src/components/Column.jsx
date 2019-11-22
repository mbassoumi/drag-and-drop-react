import React, {useMemo}       from 'react';
import PropTypes              from 'prop-types';
import Task                   from './Task';
import styled                 from 'styled-components';
import {Draggable, Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
    width: 220px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    background-color: white;
    border-bottom:  1px solid lightgrey;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightyellow' : (props.isDropDisabled ? 'white' : 'lightgreen'))}
    flex-grow: 1;
    min-height: 100px;

`;


const Column = ({id, title, tasks, index, isDropDisabled}) => {

    const renderTasks = () => {
        return tasks.map((task, taskIndex) => (
            <Task key={task.id} content={task.content} id={task.id} index={taskIndex}/>
        ))
    };

    const tasksList = useMemo(() => renderTasks(), [tasks]);


    return (
        <Draggable
            key={id}
            draggableId={id}
            index={index}
        >
            {
                (draggableProvided, draggableSnapshot) => (
                    <Container
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                        isDragging={draggableSnapshot.isDragging}
                    >
                        <Title>{title}</Title>
                        <Droppable
                            type="TASK"
                            droppableId={id}
                            isDropDisabled={isDropDisabled}
                            // direction="horizontal"
                            direction="vertical"
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    isDropDisabled={isDropDisabled}
                                >
                                    {tasksList}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )
            }
        </Draggable>
    );
};


Column.propTypes = {
    id            : PropTypes.string.isRequired,
    index         : PropTypes.number.isRequired,
    isDropDisabled: PropTypes.bool.isRequired,
    tasks         : PropTypes.array.isRequired,
    title         : PropTypes.string.isRequired
};

export default Column;