import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer ({name}){

    const [state, dispatch] = 
    React.useReducer(reducer, initialState);

    
    

    console.log(state);

  
    React.useEffect(()=> {
        console.log('Waiting for effect');

        if(!!state.loading){
            setTimeout(() => {
                console.log('Making validation')
                
                if(state.value === SECURITY_CODE){
                   
                    dispatch({
                        type: actionTypes.confirm,
                    });
                    
                } else{
                    dispatch({
                        type: actionTypes.error
                    });
                }
                
                console.log('Finish validation');
            }, 3000);
        }
            console.log('Finish the effect');
    },[state.loading]);
    
    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>
                    Delete {name} 
                </h2>
                <p>Please, write security code</p>
               
               
               {(state.error && !state.loading) && (
                <p>Error: this code has an error</p>
               )}
    
                {state.loading && (
                <p>Loading...</p>
               )}
    
    
                <input placeholder="Security Code" 
                value={state.value}
                onChange={(event) => {
                    

                    dispatch({
                        type: actionTypes.write , 
                        payload: event.target.value
                    });
                    
                }}
                />
                <button onClick={
                    ()=>{
                        dispatch({
                            type: actionTypes.check
                        });
                        } 
                    }
                >
                    Check</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted){
        return (
            <React.Fragment>
                <p>Are you sure you want to delete</p>
                <button onClick={()=>
                    {
                        dispatch({
                            type: actionTypes.delete
                        });
                        
                    }}
                    >Yes</button>
                <button  onClick={()=>
                    {
                        dispatch({
                            type: actionTypes.reset
                        });
                    }
                    }
                    >No</button>
                
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Deleted !</p>
                <button  onClick={()=>
                    {dispatch({
                        type: actionTypes.reset
                    });}
                    }
                    >Undo Delete</button>
            </React.Fragment>
        );
    }
}



const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
}

const actionTypes  ={
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'CHECK',
    write: 'WRITE',
    delete: 'DELETE',
    reset: 'RESET',
};

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]:{
        ...state,
            loading: true,
    },
    [actionTypes.confirm]:{
        ...state,
            error: false,
            loading: false,
            confirmed: true,
    },
    [actionTypes.write]:{
       ...state,
       value: payload,
    },
    [actionTypes.delete]:{
        ...state,
            deleted: true,
    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
});

const reducer = (state, action) =>{
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export {UseReducer};