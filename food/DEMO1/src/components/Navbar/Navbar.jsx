import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Trang Chủ</Link>
                <Link 
                    to='/' 
                    onClick={() => {
                        setMenu("menu");
                        const section = document.getElementById('explore-menu');
                        section?.scrollIntoView({ behavior: "smooth" });
                    }} 
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </Link>
                <Link 
                    to='/' 
                    onClick={() => {
                        setMenu("contact-us");
                        const section = document.getElementById('footer');
                        section?.scrollIntoView({ behavior: "smooth" });
                    }} 
                    className={menu === "contact-us" ? "active" : ""}
                >
                    Liên Hệ
                </Link>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="Cart" />
                                <p>Đơn Hàng</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Đăng Xuất</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
