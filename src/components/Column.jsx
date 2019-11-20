import React       from 'react';
import PropTypes   from 'prop-types';
import Task        from './Task';
import styled      from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
`;


const Column = ({id, title, tasks}) => {

    const renderTasks = () => {
        return tasks.map((task, index) => (
            <Task key={task.id} content={task.content} id={task.id} index={index}/>
        ))
    };

    return (
        <Container>
            <Title>{title}</Title>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
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
    id   : PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default Column;