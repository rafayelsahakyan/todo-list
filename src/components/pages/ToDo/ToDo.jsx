import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Search from '../../Search/Search';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import Edit from '../../Edit';
import {connect} from 'react-redux';
import {getTasks, deleteTask, deleteTasks} from '../../../store/action';
import selectIcon from './icons/selectIcon.svg';
import xIcon from './icons/xIcon.svg';
import removeIcon from './icons/removeIcon.svg';
import addIcon from './icons/addIcon.svg';

class ToDo extends Component {
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        selected: false,
        toggleNewTaskModal: false,
        editTaskModal: null
    }

    componentDidMount(){
        this.props.getTasks()
    }

    componentDidUpdate(prevProps){
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({
                toggleNewTaskModal: false
            })
            return
        }
        if(!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess){
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            })
            return
        }  
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
                editTaskModal: null
            })
            return
        }  
        
    }

    selectTask = (selectThisTask) => {
        let newSelectedTasks = new Set(this.state.selectedTasks);

        if(newSelectedTasks.has(selectThisTask)){
            newSelectedTasks.delete(selectThisTask);
        }else{
            newSelectedTasks.add(selectThisTask);
        }
        this.setState({
            selectedTasks: newSelectedTasks
        })
    }

    deleteSelected = () => {
        const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const selectAllTasks = this.props.tasks.map((task) => task._id);
        this.setState({
            selectedTasks: new Set(selectAllTasks)
        })
    }

    deselectAll = () => {
        this.setState({
            selectedTasks: new Set()
        })
    }
    toggleNewTask = () => {
        this.setState({
            toggleNewTaskModal: !this.state.toggleNewTaskModal
        })
    }

    editElem = (editThisTask) => {
        this.setState({
            editTaskModal: editThisTask
        })
    }

    render() {
        const task = this.props.tasks.map((elem) => {
            return <Col key={elem._id} className={styles.marginTop}
                xs={12} 
                sm={12} 
                md={10}
                >
                <Task
                    data={elem}
                    disabled={!!this.state.selectedTasks.size}
                    onDelete={this.props.deleteTask}
                    onSelect={this.selectTask}
                    selected={this.state.selectedTasks.has(elem._id)}
                    onEdit={this.editElem}
                />
            </Col>
        })

        return (
            <div className={styles.todoContainer}>
                <h1 className={styles.title}>ToDo List</h1>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={10}>
                            <Search/>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2" >
                        <Col className={`${styles.taskButtons} `} xs={8} sm={10} md={5} >
                        <Button 
                            disabled={
                                !this.props.tasks.length || 
                                this.props.tasks.length === this.state.selectedTasks.size
                            }
                            variant="warning" 
                            className="mb-3 justify-content-center" 
                            onClick={this.selectAll}                           
                        >
                            <img src={selectIcon} alt="" title="Select all"/>
                        </Button>
                        <Button 
                            disabled={
                                !this.props.tasks.length ||
                                !this.state.selectedTasks.size
                            } 
                            variant="warning" 
                            className="mb-3 justify-content-center" 
                            onClick={this.deselectAll}                           
                        >
                            <img src={xIcon} alt="" title="Deselect all"/>
                        </Button>
                        <Button 
                            disabled={!this.state.selectedTasks.size} 
                            variant="danger" 
                            className="mb-3 justify-content-center" 
                            onClick={this.toggleConfirm}                               
                        >
                            <img src={removeIcon} alt="" title="Delete"/>
                        </Button>                 
                        </Col>
                        <Col className={`${styles.leftTaskButtons} `} xs={4} sm={2} md={5}>
                            <Button 
                                disabled={!!this.state.selectedTasks.size}
                                variant="primary" 
                                className="mb-3 justify-content-center" 
                                onClick={this.toggleNewTask}                           
                            >
                                <img src={addIcon} alt="" title="Add"/>
                            </Button> 
                        </Col>

                    </Row>
                    <Row className="justify-content-center">
                        {task}
                    </Row>
                </Container>  
                {
                    this.state.showConfirm &&               
                    <Confirm
                        onRemoveConfirm={this.deleteSelected}
                        onRemoveCancel={this.toggleConfirm}
                        tasksSize={this.state.selectedTasks.size}
                    /> 
                }
                {
                    this.state.toggleNewTaskModal &&
                    <NewTask
                        onClose={this.toggleNewTask}
                    />
                }       
                {
                    this.state.editTaskModal &&
                    <Edit
                        taskData={this.state.editTaskModal}
                        onClose={() => this.editElem(null)}
                    />
                }  
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTaskSuccess: state.editTaskSuccess
    };
};

const mapDispatchToProps = {
    getTasks: getTasks,
    deleteTask: deleteTask,
    deleteTasks: deleteTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)