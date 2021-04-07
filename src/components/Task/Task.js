import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate, textCut } from "../../helpers/utils";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {editTask} from '../../store/action';

class Task extends PureComponent{

    handleChange = ()=>{
        const {data, onSelect}=this.props
        onSelect(data._id);
    }
    render(){
        const {data, onDelete, disabled, selected, onEdit, editTask} = this.props;
        return(
                <Card className={`${styles.tasks} ${selected ? styles.select : ""} `}>
                    <Card.Body className={styles.taskBody}>
                        <input 
                            type="checkbox" 
                            onChange={this.handleChange}
                            checked={selected}
                        />
                        <Link
                        to={`/task/${data._id}`}>
                            <Card.Title>{textCut(data.title, 30)}</Card.Title>
                        </Link>  
                        <Card.Text><span>Description: </span>{textCut(data.description, 60)}</Card.Text>
                        <Card.Text><span>Status: </span>{formatDate(data.status)}</Card.Text>
                        <Card.Text><span>Created at: </span>{formatDate(data.created_at)}</Card.Text>
                        <Card.Text><span>Date: </span>{formatDate(data.date)}</Card.Text>
                        <div className={styles.buttons}>
                        {
                            data.status === "active" ?
                            <Button  
                                className={`m-1 ${styles.btnStatus}`}
                                disabled={disabled}  
                                variant="success" 
                                onClick={() => editTask({_id: data._id, status: "done"})}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>:
                            <Button  
                                className={`m-1 ${styles.btnStatus}`}
                                disabled={disabled}  
                                variant="dark" 
                                onClick={() => editTask({_id: data._id, status: "active"})}
                            >
                                <FontAwesomeIcon icon={faRedo} />
                            </Button>
                        }
                        
                        <Button  
                            className={`m-1 ${styles.btnYellow}`}
                            disabled={disabled}  
                            variant="warning" 
                            style={{color: "#fff"}}
                            onClick={() => onEdit(data)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button  
                            className={`m-1 ${styles.btnRed}`}
                            disabled={disabled}  
                            variant="danger" 
                            onClick={() => onDelete(data._id)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                        </div>
                    </Card.Body>
                </Card>
        );
    }
}

Task.propType = {
    data: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    editTask: editTask
}

export default connect(null, mapDispatchToProps)(Task)