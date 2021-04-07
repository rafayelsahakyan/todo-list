import React from "react";
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

function AuthRoute({path, isAuthenticated, type, component:Component}){
  return (
    <Route 
    path={path}
    render={(props)=>{
      if(isAuthenticated && type === "public"){
        return <Redirect to="/"/>
      }
      if((!isAuthenticated && type === "public") || (isAuthenticated && type === "private")){
        return <Component {...props}/>
      }
      if(!isAuthenticated && type === "private"){
        return <Redirect to="/login"/>
      }
    }}
   />
  );
}

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(AuthRoute)