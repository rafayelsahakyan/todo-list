import request from '../helpers/request';
import * as actionTypes from '../store/actionTypes';
import {history} from '../helpers/history';
import {saveToken, requestWithoutToken} from '../helpers/auth';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}){
    let query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task?${query}`)
        .then((tasks)=>{
            if(!tasks){return} 
            dispatch({type:actionTypes.GET_TASKS,tasks:tasks})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function getTask(taskId){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task/${taskId}`)
        .then((task)=>{
            if(!task){return} 
            dispatch({type:actionTypes.GET_TASK, task:task})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function addTask(newTask){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task`,'POST', newTask)
        .then((task)=>{
            if(!task){return} 
            dispatch({type:actionTypes.ADD_TASK, task:task})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function deleteTask(taskId, from){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task/${taskId}`,'DELETE')
        .then((res)=>{
            if(!res){return} 
            dispatch({type:actionTypes.DELETE_TASK, taskId: taskId, from: from})
            if(from === 'singleTask'){
                history.push('/');
            }
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function deleteTasks(taskIds){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task`,'PATCH', {tasks:[...taskIds]})
        .then((res)=>{
            if(!res){return} 
            dispatch({type:actionTypes.DELETE_TASKS, taskIds: taskIds})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function editTask(data, from){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`${apiHost}/task/${data._id}`,'PUT', data)
        .then((editedTask)=>{
            if(!editedTask){return} 
            dispatch({type:actionTypes.EDIT_TASK, editedTask: editedTask, from: from, status: data.status})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function login(data){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
        .then((res)=>{ 
            saveToken(res);
            dispatch({type: actionTypes.LOGIN_SUCCESS});
            history.push('/');
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function register(data){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/user`, 'POST', data)
        .then(()=>{
            dispatch({type: actionTypes.LOGIN_SUCCESS});
            history.push('/login');
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function sendMessage(values){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/form`,'POST', values)
        .then(()=>{
            dispatch({type:actionTypes.SEND_MESSAGE})
        })
        .catch((error)=>{
            dispatch({type:actionTypes.ERROR, error: error.message})
        });
    }
}

export function getUserInfo(){   
     return(dispatch)=>{
        request(`${apiHost}/user`)
        .then((user)=>{
            if(!user){return} 
            dispatch({type:actionTypes.GET_USER_INFO, user: user})
        })
    }
}