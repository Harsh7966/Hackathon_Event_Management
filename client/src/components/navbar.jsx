import { NavLink } from 'react-router-dom';
import { UseContext } from '../storage/auth';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from 'react';


export const Navbar = () => {

    const {isLogin, userAuth, User}= UseContext();
    
    useEffect(()=>{
        userAuth();
    },[]);
    
    return (
        <>
            <nav className="nav">
                <input type="checkbox" id="nav-check"/>
                    <div className="nav-header">
                        <div className="nav-title">
                            Logo
                        </div>
                    </div>
                    <div className="nav-btn">
                        <label htmlFor="nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>

                    <ul className="nav-list ">
                        {
                            (User.type==="Organizer") ?
                            <li><NavLink to="/organizer"><FaHome /> Home</NavLink></li>
                            :
                            <li><NavLink to="/participant"><FaHome /> Home</NavLink></li>
                        }
                        {/* <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact"><FaPhoneAlt /> Contact</NavLink></li> */}
                        {   
                            isLogin ?
                            <>
                            {/* <li><NavLink to="/profile"> <FaUserAlt /> Profile</NavLink></li> */}
                            <li><NavLink to="/logout"><RiLogoutBoxRLine /> Logout</NavLink></li>
                            </>
                            :
                            <li><NavLink to="/logout"><PiSignInBold /> Sign In</NavLink></li>
                        }
                    </ul>
            </nav>
        </>
    )
}