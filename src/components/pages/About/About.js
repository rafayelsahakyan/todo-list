import React from 'react';
import styles from './stylesAbout.module.css';
import {Container, Row, Col} from 'react-bootstrap';

export default function About(){
    return(
        <Container className={styles.aboutContent}>
            <Row className="justify-content-center">
                <Col lg={8} md={10} xs={12}>
                    <h2>What is a ToDo List?</h2>
                    <p> &ensp;  &ensp;The definition is a simple one. 
                        It's a list of tasks you need to complete, or things that you want to do.
                        One of the most important reasons you should use a to do list is that it will help you stay organised. 
                        When you write all your tasks in a list, they seem more manageable. 
                        When you’ve got a clear outline of the tasks you’ve got to do and those you’ve completed, 
                        it helps you stay focused.
                        <br/>
                        <span>&ensp; &ensp;Improves your memory: </span> 
                        A to do list acts as an external memory aid. 
                        It’s only possible to hold a few pieces of information at one time. 
                        Keep a to do list and you’ll be able to keep track of everything, 
                        rather than just a few of the tasks you need to do. 
                        Your to do list will also reinforce the information, 
                        which makes it less likely you’re going to forget something.
                        <br/>
                        <span>&ensp; &ensp;Increases productivity: </span>
                        A to do list allows you to prioritize the tasks that are more important. 
                        This means you don’t waste time on tasks that don’t require your immediate attention. 
                        Your list will help you stay focused on the tasks that are the most important.
                        <br/>
                        <span>&ensp; &ensp;Helps with motivation: </span>
                        To do list is a great motivational tool because you can use it to clarify your goals. 
                        You can divide your long-term goal into smaller, 
                        more achievable short-term goals and as you tick each one off your list, 
                        your confidence will increase.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};