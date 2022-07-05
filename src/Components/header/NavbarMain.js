import React, { useEffect } from 'react';
import Logo from '../../Images/logo.png'
import AuthPage from '../../Pages/AuthPage'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Box, Typography, } from '@mui/material';
import { Link } from "react-router-dom";
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';

import { bindActionCreators } from "redux";
import { actionCreators } from '../../Actions/index'
import ProfileMenu from "./ProfileMenu";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    menu_link: {
        display: "flex",
    },
    menu_cart: {
        marginLeft: "5px",
        fontSize: "1rem",
        fontWeight: 500,
        TextDecoration: "none",
    },
}));

export default function NavbarMain() {

    const classes = useStyles();
    const location = useLocation()
    const { popupLogin, isAuthenticate, isModalOpen } = useSelector((state) => state.userReducer)
    const { cartItems } = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch()
    const { setPopupLogin, modalOpen, modalClose, setIsAuthenticate } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (location.pathname === "/login")
            setPopupLogin(false)
        else
            setPopupLogin(true)
        if (!isAuthenticate)
            setIsAuthenticate(false);
    }, [location.pathname, isAuthenticate])

    const handleClickOpen = () => {
        modalOpen()
    }

    const handleClose = () => {
        modalClose()
    }

    const mens = ["Men's T-Shirts", "Men's Casual Shirts", "Men's Formal Shirts", "Men's Kurtas", "Men's Blazers", "Men's Raincot", "Men's Suit"];

    const mens2 = ["Men's Jeans", "Men's Trousers", "Men's Trackpants", "Men's Shorts", "Men's Dhoti", "Men's Ethnic Pyjama", "Men's Cargos"];

    const women = ["Women Sarees", "Women Kurtas & Kurtis", "Ethnic Dresses", "Women Gowns", "Women Lehenga Cholis", "Women Laggings & Patialas", "Women Dupatta"];

    const women2 = ["Women Tops", "Women Dresses", "Women T-shirts & Polo T-shirts", "Women Jeans", "Women Trouser", "Women Jumpsuit"];

    const mens3 = ["Men's Sports Shoes", "Men's Casual Shoes", "Men's Sandals & Floaters", "Men's Slippers & Flip Flops", "Men's Formal Shoes", "Men's Ethnic Shoes"];

    const womens3 = ["Women Flats", "Women Heels", "Women Wedges", "Women Slipper Flip Flops", "Women Casual Shoes", "Women Sports Shoes", "Women Sneakers"];

    const watches = ["Men & Women Watches", "Men & Women Sunglasses", "Wallets", "Men & Women Belts", "Women Fashion Jewellery", "Men Fashion Jewellery"];

    const bags = ["Backpacks", "Suitcases & Trolleys", "Dufflebags", "Handbags", "Travel Accessories"];

    const audio = ["Bluetooth Headphones", "Wired Headphones", "True Wireless Earbuds", "Bluetooth Speakers", "Soundbars", "Home Theatres", "Remote Control"];

    const camera = ["DSLR & Mirrorless", "Camera tripods", "Camera Lenses", "Drone", "Flashes"];

    const laptop = ["Mouse", "Laptop Keyboards", "Router", "Data Cards", "UPS", "USB Gadgets", "Laptop Battery", "Laptop Adapter", "Wireless USB Adapter", "Processor"];

    const mobile = ["Plain Cases", "Designer Cases", "Screen Guards", "Mobile Cable", "Mobile Flash", "Mobile USB Gadget", "Camera Lens Protectors"];

    const television = ["Big Screen TVs", "Smart TVs", "4K UHD TVs", "OLED TVs", "QLED TVs", "Nanocell TVs"];

    const washing = ["Fully Automatic Front Load", "Semi Automatic Top Load", "Fully Automatic Top Load", "Wash Dryers", "Washer Only"];

    const conditioners = ["Inverter ACs", "Split ACs", "Window ACs", "5 Star ACs", "1 Ton ACs", "1.5 Ton ACs"]

    const refrigerators = ["Single Door", "Double Door", "Triple Door", "Side by Side", "4 Door", "Mini Refrigerators"];

    const appliances = ["Irons", "Water Purifiers", "Inverters", "Vaccum Cleaners", "Sewing Machines", "Air Purifiers"];

    const beauty = ["Bath & Oral Care", "Personal Hygiene", "Eye Makeup", "Face Makeup"];

    const grooming = ["Face Washes", "Beard Oils", "Hair Styling", "Shaving Essentials", "Soaps"];

    const baby = ["Baby Diapers", "Baby Wipes", "Baby Bath & Grooming", "Baby Food"];

    const sports = ["Badminton", "Cricket", "Cycling", "Football", "Fitness Equipments", "Supports"];

    return (
        <nav>
            <img src={Logo} alt="logo" />
            <ul>
                <li><div className="btn-group">
                    <p className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        PRODUCTS
                    </p>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" to="/">Fashion &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                <li>
                                    <Link className="dropdown-item" to="/">Men's Top Wear &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {mens.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Men's Bottom Wear &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {mens2.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Women Ethnic &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {women.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Women Western &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {women2.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Men Footwear &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {mens3.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Women Footwear &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {womens3.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Watches and Accessories &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {watches.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Bags, Suitcases & Luggage &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {bags.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                            </ul></li>
                        <li><Link className="dropdown-item" to="/">Electronics &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                <li>
                                    <Link className="dropdown-item" to="/">Audio &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {audio.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Camera & Accessories &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {camera.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Laptop Accessories &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {laptop.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Mobile Accessories &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {mobile.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link className="dropdown-item" to="/">Appliances &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                <li>
                                    <Link className="dropdown-item" to="/">Television &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {television.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Washing Machines &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {washing.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Air Conditioners &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {conditioners.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Refrigerators &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {refrigerators.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Home Appliances &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {appliances.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link className="dropdown-item" to="/">Beauty, Toys & More &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                <li>
                                    <Link className="dropdown-item" to="/">Beauty & Personal Care &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {beauty.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Men's Grooming &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {grooming.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Baby Care &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {baby.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Sports & Fitness &nbsp;&nbsp; &raquo;</Link>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        {sports.map((value, index) => {
                                            return <li key={index}><Link className="dropdown-item" to={`products/${value}`}>{value}</Link></li>
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div></li>
                {window.location.pathname === '/' ? <><li><a href="#about">ABOUT</a></li>
                    <li><a href="#contact">CONTACT</a></li></> : <><li><Link to="/">ABOUT</Link></li>
                    <li><Link to="/">CONTACT</Link></li></>}
            </ul>
            {isAuthenticate ? (
                <ProfileMenu />
            ) : (
                <span onClick={() => { if (popupLogin) handleClickOpen() }}>LOGIN</span>
            )}

            <Link to="/cart">
                <Box className={classes.menu_link}>
                    <ShoppingCart />
                    {cartItems.length > 0 && (
                        <Badge badgeContent={cartItems.length} color="secondary" style={{ marginLeft: '-58px' }}></Badge>
                    )}
                    <Typography className={classes.menu_cart}>Cart</Typography>
                </Box>
            </Link>

            {/* ########## Login Dialog Box  #########*/}
            <Dialog onClose={handleClose} open={isModalOpen}>
                <DialogContent style={{ width: "100%" }}>
                    <AuthPage popup={true} />
                </DialogContent>
            </Dialog>
        </nav>
    );
}