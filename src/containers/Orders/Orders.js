import React,{Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{
    state={
        orders:[],
        loading : true
    }

    componentDidMount(){
       this.props.fetchOrders(this.props.token,this.props.userId)
    }
    render(){
        let orders = <Spinner/>
        if(!this.props.loading){
            orders =  this.props.orders.map((order)=>{
                 return <Order
                     key = {order.id}
                     ingredients = {order.ingredeints}
                     price = {order.price}
                     ></Order>
             })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }


}

const mapStateToProps = (state) =>{
    return{
        orders: state.orderReducer.orders,
        loading:state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }

}

const mapDispatchToProps = (dispatch)=>{
    return{
        fetchOrders: (token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));