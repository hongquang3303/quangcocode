import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        city:"",
        street:"",
        
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) =>{
        event.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
            if (cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo); 
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCartAmount(),

        }
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
        if (response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            alert("Error");
        }
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/cart')

        }
        else if(getTotalCartAmount()===0)
        {
            navigate('/cart')
        }
    },[token])


    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Thông Tin Khách Hàng</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Tên' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email ' />
                <input required  name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số Điện Thoại' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành Phố' />
                   
                </div>
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>THÔNG TIN ĐƠN HÀNG</h2>
                    <div>
                    <div className="cart-total-details">
                            <p>Tổng Phụ</p>
                            <p>{getTotalCartAmount().toLocaleString()} VND</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Được Gỉảm</p>
                            <p>{getTotalCartAmount() === 0 ? "0" : "0"} VND</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Tổng Tiền</b>
                            <b>{(getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 0
                                ).toLocaleString()}{" "}
                                VND</b>
                        </div>
                    </div>
                    <button type='submit'>THANH TOÁN</button>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder