import React, { useState } from 'react'

import { motion } from 'framer-motion'

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user , cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setisMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }
        else {
            setisMenu(!isMenu)
        }
    };

    const logout = () => {
        setisMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    }

    const showCart = ()=>{
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>

            {/* desktop & tablet */}

            <div className='hidden md:flex w-full h-full items-center justify-between'>

                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} alt="logo" className='w-8 object-cover' />
                    <p className='text-headingColor text-x1 font-bold'>City</p>
                </Link>

                <div className='flex items-center gap-8'>

                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-cen ter gap-8 '>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>About us</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Services</li>
                    </motion.ul>

                    <div className='relative flex items-center justify-center ' onClick={showCart}>

                        <MdShoppingBasket className='text- text-textColor text-2xl cursor-pointer' />

                       {cartItems && cartItems.length > 0 && ( 
                       <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                        </div>)}

                    </div>

                    <div className='relative'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-10 min-w=[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                            src={user ? user.photoURL : Avatar} alt="userprofile "
                            onClick={login} />

                        {
                            isMenu && (
                                <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                                    {
                                        user && user.email === "parelharsh0250@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setisMenu(false)} >New Item <MdAdd /> </p>
                                            </Link>
                                        )
                                    }
                                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}>Logout <MdLogout /> </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* mobiles */}
            <div className='flex items-center justify-between md:hidden w-full h-full '>
                <div className='relative flex items-center justify-center' onClick={showCart}>

                    <MdShoppingBasket className='text- text-textColor text-2xl cursor-pointer' />

                    {cartItems && cartItems.length > 0 && ( 
                       <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                        </div>)}

                </div>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} alt="logo" className='w-8 object-cover' />
                    <p className='text-headingColor text-x1 font-bold'>City</p>
                </Link>




                <div className='relative'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        className='w-10 min-w=[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                        src={user ? user.photoURL : Avatar} alt="userprofile "
                        onClick={login} />

                    {
                        isMenu && (
                            <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                                {
                                    user && user.email === "parelharsh0250@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'>New Item <MdAdd /> </p>
                                        </Link>
                                    )
                                }

                                <ul className='flex flex-col  '>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2' onClick={()=> setisMenu(false)}>Home</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2' onClick={()=> setisMenu(false)}>Menu</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2' onClick={()=> setisMenu(false)}>About us</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2' onClick={()=> setisMenu(false)}>Services</li>
                                </ul>

                                <p className=' m-2 p-2 rounded-md shadow-md px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out justify-center text-textColor text-base' onClick={logout}>Logout <MdLogout /> </p>
                            </div>
                        )
                    }
                </div>
            </div>

        </header>
    )
}

export default Header