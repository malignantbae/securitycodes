import React from "react";
import { Loading } from "./Loading";
const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component{
    
    constructor (props){
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    /* componentDidMount(){
        console.log('componentDidMount');
    } */
    
        componentDidUpdate(){
            console.log('ComponentdidUpdate');
            
            if(!!this.state.loading){
                setTimeout(() => {
                    console.log('Making validation')
                    
                    if(SECURITY_CODE === this.state.value){
                        this.setState({error: false, loading: false});
                    } else{
                        this.setState({error: true, loading: false})
                    }
        
                    console.log('Finish validation');
                }, 3000);
            }
        }

    UNSAFE_componentWillMount(){
        console.log('UNSAFE_componentWillMount');
    }


    render(){
        //const {error , loading, value} = this.state;
        
        return (
            <div>
                <h2>
                    Delete {this.props.name}
                </h2>
                <p>Please, write security code</p>

                {(this.state.error && !this.state.loading) && (
                <p>Error: this code has an error</p>
                )}

                {this.state.loading && (
                <Loading />
                )}


                <input placeholder="Security Code" 
                value={this.state.value}
                onChange={(event)=>{
                    this.setState({value: event.target.value})
                }}
                />
                
                <button onClick={()=> 
                    this.setState({loading: true})
                }
                    >Check</button>
            </div>
        );
    }
}

export { ClassState }
