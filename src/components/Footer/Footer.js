import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../helpers/auth';
import './styleFooter.module.css';
import linkedinLogo from './img/linkedin.svg';
import githubLogo from './img/github.svg';

function Footer(props){
    return(
        <footer>
            <div>
                <ul>
                    {props.isAuthenticated && <li><Link to="/">Home</Link></li>}
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                    {props.isAuthenticated ? 
                    <button
                        onClick={() => logout()}
                    >
                        Log out
                    </button> :
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    </>
                    }
                </ul>
                <ul>
                    <a href="https://www.linkedin.com/in/rafayel-sahakyan" rel="noreferrer" target="_blank"><li><img src={linkedinLogo} alt="linkedin logo"/>Linkedin</li></a>   
                    <a href="https://github.com/Raf2604" rel="noreferrer" target="_blank"><li><img src={githubLogo} alt="github logo"/>Github</li></a>
                </ul>
            </div>
            <div>
                    created by Rafayel Sahakyan
            </div>
        </footer>
    )
}

const mapStateToProps = (state)=>{
    return {
      isAuthenticated: state.isAuthenticated
    }
  }
  
const mapDispatchToProps = {
    logout: logout
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Footer);