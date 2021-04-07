import { React, Component } from 'react';
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../../helpers/utils";
import styles from "./stylesSingleTask.module.css";
import Edit from '../../Edit';
import {connect} from 'react-redux';
import {getTask, deleteTask, editTask} from '../../../store/action';

class SingleTask extends Component{
    state={
        singleTaskModal:false
    }

    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId)
    }

    componentDidUpdate(prevProps){
        if(!prevProps.editSingleTaskSuccess && this.props.editSingleTaskSuccess){
            this.setState({
                singleTaskModal: false
            })
            return
        }
    }

    handleDeleteSingleTask = ()=> {
        this.props.deleteTask(this.props.task._id, 'singleTask')
    }

    handleEditSingleTask = ()=>{
        this.setState({
            singleTaskModal:!this.state.singleTaskModal
        })
    }

    render(){
        const {task, editTask} = this.props;
        return(
            <div>
                <Container className={styles.singleTaskContent}>
                    <Row className="justify-content-center">
                        <Col md={8} sm={10} xs={12}>
            {
                task?
                    <Card>
                        <Card.Body>
                            <Card.Title><h4>{task.title}</h4></Card.Title>
                            <Card.Text><span>Description:</span> {task.description}</Card.Text>
                            <Card.Text><span>Status:</span> {formatDate(task.status)}</Card.Text>
                            <Card.Text><span>Created at:</span> {formatDate(task.created_at)}</Card.Text>
                            <Card.Text><span>Date:</span> {formatDate(task.date)}</Card.Text>
                            <div className={styles.btns}>
                                {
                                    task.status === "active" ?
                                    <Button  
                                        className={"m-1"}
                                        variant="success" 
                                        onClick={() => editTask({_id: task._id, status: "done"}, "singleTask")}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </Button>:
                                    <Button  
                                        className={"m-1"} 
                                        variant="dark" 
                                        onClick={() => editTask({_id: task._id, status: "active"}, "singleTask")}
                                    >
                                        <FontAwesomeIcon icon={faRedo} />
                                    </Button>
                                }
                                <Button  
                                    className={"m-1"} 
                                    variant="warning" 
                                    style={{color: "#fff"}}
                                    onClick={this.handleEditSingleTask}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button  
                                    className={"m-1"}
                                    variant="danger" 
                                    onClick={this.handleDeleteSingleTask}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>:
                <p>Loading...</p>
            }
                </Col>
                </Row>
            </Container>

                {
                    this.state.singleTaskModal &&
                    <Edit
                        taskData={task}
                        onClose={this.handleEditSingleTask}
                        from="singleTask"
                    />
                }
            </div>

        );
    }
};

const mapStateToProps = (state)=>{
    return {
        task: state.task,
        editSingleTaskSuccess: state.editSingleTaskSuccess
    };
};

const mapDispatchToProps = {
    getTask: getTask,
    deleteTask: deleteTask,
    editTask: editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)