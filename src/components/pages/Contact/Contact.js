import React, {useState, useEffect} from 'react';
import styles from './stylesContact.module.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import {sendMessage} from '../../../store/action';

function Contact(props){

    useEffect(()=>{
        if(props.sendMessageSuccess){
            setValues({
                name:'',
                email:'',
                message:'' 
            })
        }
    },[props.sendMessageSuccess])

    const [values, setValues] = useState({
        name:'',
        email:'',
        message:''
    })
    const [errors, setErrors] = useState({
        name:null,
        email:null,
        message:null
    })

    const handleChange = ({target:{name,value}})=>{
        if(!value.trim()){
            setErrors({
                ...errors,
                [name]:'Field is required'
            })
        }else{
            setErrors({
                ...errors,
                [name]:null
            })
        }

        if(name==="email" && value){
            const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!reg.test(value)){
                setErrors({
                    ...errors,
                    email:'Invalid email'
                })
            }
        }

        setValues({
            ...values,
            [name]:[value]
        })

    }

    const handleFocusOut = ({target:{name,value}})=>{
        setValues({
            ...values,
            [name]:value.trim()
        })
    }

    const disableSpace = (event)=>{
        if(event.charCode === 32){
            event.preventDefault();
        }
    }

    const handleSubmit = ()=>{
        let valuesArray = Object.values(values);
        let valuesExist = !valuesArray.some(element => element==="");

        let errorsArray = Object.values(errors);
        let errorsExist = !errorsArray.every(element => element===null);

        if(valuesExist && !errorsExist){
            props.sendMessage(values);
        }

        if(!valuesExist && !errorsExist){
            setErrors({
                name:'Field is required',
                email:'Field is required',
                message:'Field is required'
            })
        }
    }

    return(
        <Container className={styles.centerDiv}>
            <Row className="justify-content-center mr-0 ml-0">
                <Col lg={8} md={10} xs={12}>
                    <h2>Contact us</h2>
                     <Form.Group>
                        <Form.Control
                        className={errors.name ? styles.errorBorder: ""}
                        type="text" 
                        placeholder="Enter your name"
                        name="name" 
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleFocusOut}
                        />
                        <Form.Text className="text-danger">
                            {errors.name}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                        className={errors.email ? styles.errorBorder: ""}
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleFocusOut}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.email}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                        className={errors.message ? styles.errorBorder: ""}
                        as="textarea" 
                        placeholder="Enter your message"
                        rows={5}
                        name="message" 
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleFocusOut}
                        />
                        <Form.Text className="text-danger">
                            {errors.message}
                        </Form.Text>
                    </Form.Group>

                    <Button
                    className={`${styles.sendBtn}`}
                    variant="primary"
                    onClick={handleSubmit}
                    >
                    Send
                    </Button>

                </Col>
            </Row>
        </Container>
        
    );
};

const mapStateToProps = (state)=>{
    return {
        sendMessageSuccess: state.sendMessageSuccess
    }
}

const mapDispatchToProps = {
    sendMessage: sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)