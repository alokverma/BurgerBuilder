import React,{Component} from 'react'
import Model from '../../components/UI/Model/Model'
import Aux from '../Auxilary/Auxilary'
const withErrorHandler = (WrappedCompoents,axios) => {
    return class extends Component{
        state = {
            error : null
        }

        componentWillMount(){
            this.reqInterceptores = axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })

           this.respInterceptors =  axios.interceptors.response.use(res=>res,error=>{
                    this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptores)
            axios.interceptors.response.eject(this.respInterceptors)
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Model show = {this.state.error}
                    modelClosed = {this.errorConfirmedHandler}>
                      {this.state.error? this.state.error.message : null}
                    </Model>
                    <WrappedCompoents {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;