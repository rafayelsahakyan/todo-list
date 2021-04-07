import React, {useState} from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styles from './stylesLogin.module.css';
import {Link} from 'react-router-dom';
import {login} from '../../../store/action';
import {connect} from 'react-redux';

function Login(props){
    const [values, setValues] = useState({
        email:'',
        password:''
        
    })
    const [errors, setErrors] = useState({
        email:null,
        password:null
    })


    const handleChange = ({target:{name,value}})=>{
        setErrors({
            ...errors,
            [name]: null
        })

        setValues({
            ...values,
            [name]: value
        })
    }

    const disableSpace = (event)=>{
        if(event.charCode === 32){
            event.preventDefault();
        }
    }

    const handleSubmit = ()=>{
        const {email, password} = values;
        let valid = true;

        let emailMessage = null;
        if(email){
            const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!reg.test(email)){
                emailMessage = 'Invalid email';
                valid = false;
            }
        }else{
            emailMessage = 'Email is required';
            valid = false;
        }

        let passwordMessage = null;
        if(!password){
            passwordMessage = 'Password is required';
            valid = false;
        }

        setErrors({
            email: emailMessage,
            password: passwordMessage
        })

        if(valid){
            props.login(values);
        }
    }

    return(
        <Container className={styles.loginContent}>
            <Row className="justify-content-center">
                <Col md={6} sm={8} xs={12}>
                    <h2>Login</h2>

                    <Form.Group>
                        <Form.Control 
                        className={errors.email ? styles.errorBorder: ""}
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={values.email}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.email}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        className={errors.password ? styles.errorBorder: ""}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.password}
                        </Form.Text>
                    </Form.Group>

                    <Button
                        className={`${styles.loginBtn}`}
                        variant="primary"
                        onClick={handleSubmit}
                    >
                    Login
                    </Button>

                    <Link className={`${styles.link}`} to='/register'>Don't have an account? Sign up here!</Link>
                </Col>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = {
    login: login
}

export default connect(null, mapDispatchToProps)(Login);