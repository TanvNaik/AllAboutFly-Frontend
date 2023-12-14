import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { getUserOrders } from './helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const [error, setError] = useState("")
    const {user, token} = isAuthenticated();

    const [orders, setOrders] = useState([]);
    
    useEffect(()=>{
        getUserOrders(user._id)
        .then(data => {
            if(data.error){
              setError(data.error)
            }else{
                setOrders(data.orders)
            }
        })
    },[])
  return (
    <Base>
    <div className="d-flex flex-wrap justify-content-center user-order " style={{marginTop: "7%"}}>

{orders.length > 0 && orders.map((order,key) => {
  return(
    <div key={key} className=' w-25 card mb-4 m-1' style={{maxWidth:"25%"}}  >
            
    <ul className='list-group' >
    <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Order Placed at:
        </span>
        &nbsp;
        {order.createdAt.split("T")[0]}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Address:
        </span>
        &nbsp;
        {order.address}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Contact No:
        </span>
        &nbsp;
        {order.contact_no}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Amount
        </span>
        &nbsp;
         {order.amount}/- 
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Status:
        </span>
        &nbsp;
        {order.status === 'Delivered'  && (<span className="text-success">Delivered</span>)}
        {order.status !== 'Delivered'  && (<span className="text-info">{order.status}</span>)}
        
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Status Updated At:
        </span>
        &nbsp;
        {order.updatedAt.split("T")[0]}
      </li>
      
      
        
      
      <li className='list-group-item'>
      <Link to={"/order/" + order._id}>
      <button  className="btn btn-success " style={{width: "100%", borderRadius:"5px"}}>
         View Order Details
        </button>
        </Link>
      </li>
      
    </ul>
  </div>
    
  )
  
})}
{orders.length > 0 && orders.map((order,key) => {
  return(
    <div key={key} className=' w-25 card mb-4 m-1' style={{maxWidth:"25%"}}  >
            
    <ul className='list-group' >
    <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Order Placed at:
        </span>
        &nbsp;
        {order.createdAt.split("T")[0]}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Address:
        </span>
        &nbsp;
        {order.address}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Contact No:
        </span>
        &nbsp;
        {order.contact_no}
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Amount
        </span>
        &nbsp;
         {order.amount}/- 
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Status:
        </span>
        &nbsp;
        {order.status === 'Delivered'  && (<span className="text-success">Delivered</span>)}
        {order.status !== 'Delivered'  && (<span className="text-info">{order.status}</span>)}
        
      </li>
      <li className='list-group-item'>
        <span
          className='badge bg-warning text-dark
           mr-2 '
        >
          Status Updated At:
        </span>
        &nbsp;
        {order.updatedAt.split("T")[0]}
      </li>
      
      
        
      
      <li className='list-group-item'>
      <Link to={"/order/" + order._id}>
      <button  className="btn btn-success " style={{width: "100%", borderRadius:"5px"}}>
         View Order Details
        </button>
        </Link>
      </li>
      
    </ul>
  </div>
    
  )
  
})}

  


</div>
{orders.length === 0 && (
  <div className='w-100 text-danger alert-warning text-center' style={{fontSize: "1.2rem"}}>
      You don't have any orders
  </div>
)}

    </Base>
  )
}
