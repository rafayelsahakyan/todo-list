import React, { Component, createRef } from 'react';
import { Form, FormControl, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { formatDate } from "../helpers/utils";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import {editTask} from '../store/action';

class EditTaskModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.taskData,
            date: props.taskData.date ? new Date(props.taskData.date) : ""
        };
        this.inputRef = createRef();
    }

    inputTextChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        })
    }

    addFromKeyboard = (event) => {
        if (event.key === "Enter") {
            this.changeTask();
        }
    }

    changeTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return
        }
        const newTask = {
            _id: this.state._id,
            title: title,
            description: description,
            date: formatDate(this.state.date.toISOString())
        }
        this.props.editTask(newTask, this.props.from);
    }

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
    }

    componentDidMount(){
        this.inputRef.current.focus();
    }

    render() {
        const { onClose } = this.props;
        return (
                <Modal
                    onHide={onClose}
                    show={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit task
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl
                            ref={this.inputRef}
                            className={"mb-3"}
                            value={this.state.title}
                            aria-describedby="basic-addon2"
                            onChange={(event)=>this.inputTextChange(event, "title")}
                            onKeyPress={this.addFromKeyboard}
                            name="title"
                        />
                        <Form.Control  
                            as="textarea" 
                            rows={3} 
                            value={this.state.description}
                            onChange={(event)=>this.inputTextChange(event, "description")}
                            name="description"
                        />
                        <DatePicker 
                            className={"mt-3"}
                            minDate={new Date()}
                            selected={this.state.date} 
                            onChange={this.handleChangeDate}  
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.changeTask}>Confirm</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                    </Modal>
        )
    }
}

EditTaskModal.propType = {
    taskData: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    editTask: editTask
}


export default connect(null, mapDispatchToProps)(EditTaskModal)