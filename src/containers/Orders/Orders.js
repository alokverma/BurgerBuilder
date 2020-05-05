import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'

class Orders extends Component{
    state={
        orders:[],
        loading : true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(resp=>{
                console.log(resp.data)
                const fetedOrders = [];
                for(let key in resp.data){
                    fetedOrders.push({
                        ...resp.data[key],
                        id:key})
                }
                this.setState({loading:false})
                this.setState({orders:fetedOrders})

            })
    }
    render(){
        return (
            <div>
               {this.state.orders.map((order)=>{
                   return <Order
                    key = {order.id}
                    ingredients = {order.ingredeints}
                    price = {order.price}
                    ></Order>
               })}
            </div>
        );
    }


}

export default withErrorHandler(Orders,axios);