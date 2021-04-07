import React, {useState} from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styles from './stylesRegister.module.css';
import {Link} from 'react-router-dom';
import {register} from '../../../store/action';
import {connect} from 'react-redux';

function Register(props){
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    const handleChange = ({target:{name,value}})=>{
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });
    }

    const disableSpace = (event)=>{
        if(event.charCode === 32){
            event.preventDefault();
        }
    }

    const handleSubmit = ()=>{
        const {name, surname, email, password, confirmPassword} = values;
        let valid = true;

        let nameMessage = null;
        if(!name){
            valid = false;
            nameMessage = 'Name is required';
        }

        let surnameMessage = null;
        if(!surname){
            valid = false;
            surnameMessage = 'surname is required';
        }
        
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
        if(password){
            if(password.length < 6){
                passwordMessage = 'Password should be more then 6 symbols';
                valid = false;
            }else if(!password.match(/(?=.*[a-z])/)){
                passwordMessage = 'Password must have at least one lowercase letter';
                valid = false;
            }else if(!password.match(/(?=.*[A-Z])/)){
                passwordMessage = 'Password must have at least one uppercase letter';
                valid = false;
            }else if(!password.match(/(?=.*[0-9])/)){
                passwordMessage = 'Password must contain at least one numeric character';
                valid = false;
            }else if(!password.match(/(?=.[@$!%*#?&])/)){
                passwordMessage = 'Password must contain at least one special character (@ $ ! % * # ? &)';
                valid = false;
            }
        }else{
            passwordMessage = 'Password is required';
            valid = false;
        }

        let confirmPasswordMessage = null;
        if(!confirmPassword){
            confirmPasswordMessage = 'Confirm password is required';
            valid = false;
        }else if(password!==confirmPassword){
                confirmPasswordMessage = "Passwords didn't match";
                valid = false; 
        }

        setErrors({
            name: nameMessage,
            surname: surnameMessage,
            email: emailMessage,
            password: passwordMessage,
            confirmPassword: confirmPasswordMessage
        })

        if(valid){
            props.register(values);
        }
    }

    return(
        <Container className={styles.registerContent}>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h2>Register</h2>

                    <Form.Group>
                        <Form.Control 
                        className={errors.name ? styles.errorBorder: ""}
                        name="name" 
                        type='text'
                        placeholder="Enter your name" 
                        value={values.name}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        maxLength="15"
                        />
                        <Form.Text className="text-danger">
                            {errors.name}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                        className={errors.surname ? styles.errorBorder: ""}
                        name="surname" 
                        type='text'
                        placeholder="Enter your surname" 
                        value={values.surname}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        maxLength="15"
                        />
                        <Form.Text className="text-danger">
                            {errors.surname}
                        </Form.Text>
                    </Form.Group>

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

                    <Form.Group>
                        <Form.Control
                        className={errors.confirmPassword ? styles.errorBorder: ""}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.confirmPassword}
                        </Form.Text>
                    </Form.Group>

                    <Button
                        className={`${styles.loginBtn}`}
                        variant="primary"
                        onClick={handleSubmit}
                    >
                    Register
                    </Button>

                    <Link className={`${styles.link}`} to='/login'>Already have an account? Sign in!</Link>
                </Col>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = {
    register: register
}

export default connect(null, mapDispatchToProps)(Register);