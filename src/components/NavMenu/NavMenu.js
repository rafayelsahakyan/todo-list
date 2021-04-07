import React, {useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './styleNavMenu.module.css';
import {connect} from 'react-redux';
import {logout} from '../../helpers/auth';
import {getUserInfo} from '../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

function NavMenu(props){
  
    useEffect(()=>{
      props.getUserInfo();
    })

    return(
      <Navbar className={styles.menuResponse} bg="dark" variant="dark">
        <Nav className="mr-auto w-100 justify-content-between">
          <div>
            {props.isAuthenticated &&
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/"
              exact>Home</NavLink>
            }
            <NavLink 
            className={styles.menuItem}
            activeClassName={styles.active}
            to="/about"
            exact>About</NavLink>
            <NavLink 
            className={styles.menuItem}
            activeClassName={styles.active}
            to="/contact"
            exact>Contact us</NavLink>
          </div>

          {props.isAuthenticated ? 
            <div>
              <FontAwesomeIcon icon={faUserAlt} className={styles.userInfoIcon}/>
              <span className={styles.userInfo}>{`${props.userName} `}</span>
              <span className={styles.userInfo}>{`${props.userSurname} │ `}</span>
              <button className={styles.logoutBtn}
              onClick={() => logout()}
              >
                Log out
              </button> 
            </div>:
            <div>
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/login"
              exact>Login</NavLink>
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/register"
              exact>Register</NavLink>
            </div> 
          }

        </Nav>
      </Navbar>
    );
};

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
    userSurname: state.userSurname
  }
}

const mapDispatchToProps = {
  logout: logout,
  getUserInfo: getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);