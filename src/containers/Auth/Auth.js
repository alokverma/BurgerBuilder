import React,{Component }from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component{

    state ={
        controls:{
            email:{
                elementType : 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Your mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType : 'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'password(must be of 6 characters  )'
                },
                value:'',
                validation:{
                    required:true,
                    minlenght:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }

    swithAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    }
    inputChangeHandler = (event,controlName)=>{
        const updatedControlss = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidation(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({
            controls:updatedControlss
        })
    }
    checkValidation = (value,rules)=>{
        let isValid = false;
        if(rules.required){
            isValid = value.trim() !== ''
        }
        return isValid;
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value,
            this.state.controls.password.value,this.state.isSignUp)
    }

    componentDidMount(){
        if(!this.props.buergerBuilding && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }


    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map((formElement)=>{
                return(<Input
                         key = {formElement.id}
                         elementType = {formElement.config.elementType}
                         elementConfig = {formElement.config.elementConfig}
                         invalid = {!formElement.config.valid}
                         value = {formElement.config.value}
                         touched = {formElement.config.touched}
                         shouldValidate = {formElement.config.validation}
                         changed = {(event)=>this.inputChangeHandler(event,formElement.id)}
                         ></Input>);
        })
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null
        if(this.props.isAuthenitcated){
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
        return(
            <div className = {classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType = "Success">Submit</Button>
                </form>
                <Button 
                     clicked = {this.swithAuthModeHandler}
                     btnType = "Danger">Switch to {this.state.isSignUp? 'Sign-In':'Signup'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        loading:state.authReducer.loading,
        error:state.authReducer.error,
        isAuthenitcated:state.authReducer.token !==null,
        buergerBuilding: state.burgerBuilder.building,
        authRedirect: state.authReducer.redirectPath
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        authenticate : (email,pass,isSignUp)=>dispatch(actions.auth(email,pass,isSignUp)),
        onSetAuthRedirectPath : ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);