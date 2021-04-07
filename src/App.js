import React, {useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Switch, Redirect, Route} from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import ToDo from './components/pages/ToDo/ToDo.jsx';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import {connect} from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';
import AuthRoute from './components/AuthRoute';
import Footer from './components/Footer/Footer';

const toastStyle = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function App(props) {

  useEffect(()=>{
    if(props.successMessage){
      toast.success(props.successMessage, toastStyle);
    }
    if(props.errorMessage){
      toast.error(props.errorMessage, toastStyle);
    }

  },[props.successMessage, props.errorMessage])

  return (
    <div className="App">
      <Router history={history}>
        <NavMenu/>
        <Switch>
          <AuthRoute 
          type="private"
          path='/'
          component = {ToDo}
          exact
         />
          <AuthRoute
          type="private"
          path="/home"
          component={ToDo}
          exact
          /> 
          <Route
          path="/about"
          component={About}
          exact
          />
          <Route
          path="/contact"
          component={Contact}
          exact
          />
          <AuthRoute
          type="public"
          path="/register"
          component={Register}
          exact
          />
          <AuthRoute
          type="public"
          path="/login"
          component={Login}
          exact
          />
          <AuthRoute
          type="private"
          path="/task/:taskId/"
          component={SingleTask}
          exact
          />
          <Route
          path="/not-found"
          component={NotFound}
          exact
          />
          <Redirect to="/not-found"/>
        </Switch>
        <Footer/>
      </Router>
      { props.spinnerShow && <Spinner/> } 
      <ToastContainer/>
    </div>
  ); 
}

const mapStateToProps = (state)=>{
    return {
      spinnerShow: state.spinnerShow,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage
    };
};

export default connect(mapStateToProps)(App) 