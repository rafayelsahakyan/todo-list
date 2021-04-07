import React, { PureComponent, createRef } from 'react';
import { Form, FormControl, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { formatDate } from "../../helpers/utils";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import {addTask} from '../../store/action';

class NewTask extends PureComponent {
    constructor(props){
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: "",
            description: "",
            date: new Date()
        }
    }

    componentDidMount(){
        this.inputRef.current.focus()
    }

    inputTextChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        })
    }

    addFromKeyboard = (event) => {
        if (event.key === "Enter") {
            this.creatTask();
        }
    }

    creatTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            this.setState({
                title: "",
                description: ""
            })
            return
        }
        const newTask = {
            title: title,
            description: description,
            date: formatDate(this.state.date.toISOString())
        }
        this.props.addTask(newTask);
    }

    handleSelectDate = (value) =>{
        this.setState({
            date: value || new Date()
        })
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
                            Add new task
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl
                            ref={this.inputRef}
                            className={"mb-3"}
                            placeholder="Title"
                            aria-describedby="basic-addon2"
                            onChange={(event)=>this.inputTextChange(event, "title")}
                            onKeyPress={this.addFromKeyboard}
                            name="title"
                        />
                        <Form.Control  
                            as="textarea" 
                            rows={3} 
                            placeholder="Description"
                            onChange={(event)=>this.inputTextChange(event, "description")}
                            name="description"
                        />
                        <DatePicker 
                            className={"mt-3"}
                            minDate={new Date()}
                            selected={this.state.date} 
                            onChange={this.handleSelectDate}  
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.creatTask}>Create</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                    </Modal>
        )
    }
}

NewTask.propType = {
    onClose: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    addTask: addTask
}


export default connect(null, mapDispatchToProps)(NewTask)