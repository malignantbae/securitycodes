import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState ({name}){

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');
    
    console.log(state);

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    }
    React.useEffect(()=> {
        console.log('Waiting for effect');

        if(!!state.loading){
            setTimeout(() => {
                console.log('Making validation')
                
                if(state.value === SECURITY_CODE){
                   
                    onConfirm();
                    
                } else{
                    onError();
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
                    
                    onWrite(event.target.value);
                    
                }}
                />
                <button onClick={
                    ()=>{
                        onCheck();
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
                        onDelete();
                    }
                    }
                    >Yes</button>
                <button  onClick={()=>
                    {setState({
                        ...state,
                        confirmed: false,
                        value: '',
                    });}
                    }
                    >No</button>
                
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Deleted !</p>
                <button  onClick={()=>
                    {setState({
                        ...state,
                        confirmed: false,
                        deleted: false,
                        value: '',
                    })}
                    }
                    >Undo Delete</button>
            </React.Fragment>
        );
    }
}
export {UseState};