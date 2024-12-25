import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Ảnh</p>
                    <p>Tên món</p>
                    <p>Giá tiền</p>
                    <p>Số lượng</p>
                    <p>Tổng tiền</p>
                    <p>Xóa món ăn</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price.toLocaleString('vi-VN')} VND</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{(item.price * cartItems[item._id]).toLocaleString('vi-VN')} VND</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>THÔNG TIN ĐƠN HÀNG</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng Phụ</p>
                            <p>{getTotalCartAmount().toLocaleString('vi-VN')} VND</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Được Giảm</p>
                            <p>{(getTotalCartAmount() === 0 ? 0 : 0).toLocaleString('vi-VN')} VND</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Tổng Tiền</b>
                            <b>{(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()).toLocaleString('vi-VN')} VND</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>XÁC NHẬN</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
