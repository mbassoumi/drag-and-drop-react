import React       from 'react';
import PropTypes   from 'prop-types'
import styled      from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
    
    display: flex;
`;

const Handle = styled.div`
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
`;


const Task = ({id, content, index}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {/*<Handle*/}
                    {/*    {...provided.dragHandleProps}*/}
                    {/*/>*/}
                    {content}
                </Container>
            )}
        </Draggable>
    );
};


Task.propTypes = {
    content: PropTypes.string.isRequired,
    id     : PropTypes.string.isRequired,
    index  : PropTypes.number.isRequired
};

export default Task;