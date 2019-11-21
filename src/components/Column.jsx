import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import styled from 'styled-components';
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
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : (props.isDropDisabled ? 'white' : 'lightgreen'))}
    flex-grow: 1;
    min-height: 100px;

`;


const Column = ({id, title, tasks, draggableProvided, draggableSnapshot, isDropDisabled}) => {

    const renderTasks = () => {
        return tasks.map((task, index) => (
            <Task key={task.id} content={task.content} id={task.id} index={index}/>
        ))
    };

    return (
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
                        {renderTasks()}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
};


Column.propTypes = {
    draggableProvided: PropTypes.any.isRequired,
    draggableSnapshot: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    isDropDisabled: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default Column;