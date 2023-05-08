import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Header & Footer/Footer";
// import Navbar from "../Header & Footer/Navbar";
import Navbar from '../Header & Footer/Navbar'

import "../Header & Footer/Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { FiUser } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuth } from '../../../context/auth'
import { useCart } from '../../../context/cart'
import { Badge } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scroll from "../Home Pages/Scroll";
import Logo from './logo.png'
import { url} from '../../../API/api'

const Blogsingles = () => {

  const [Datas, setdata] = useState([]);
  const user_id = localStorage.getItem('userId')

  const dataload = async () => {
    await axios.get(`${url}/auth/get-add-to-cart/` + user_id)
      .then((res) => {
        setdata(res.data.cart_data)
      })  
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    dataload();
  }, [])

  const [Mobile, setMobile] = useState(false);

  const [auth, setauth] = useAuth();
  const [cart, setCart] = useCart();


  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
      userID: "",
    });
    localStorage.removeItem("auth");
    // localStorage.removeItem("auth");
    toast.success("Logout");
  };

  const [anchorElUser, setAnchorElUser] = useState();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const { id } = useParams();

  const [Data, setData] = useState({
    blog_date:'',
    blog_desc:'',
    blog_fulldesc:'',
    blog_image:'',
    blog_title:'',
    blog_writername:'',
  })

  const viewSingleblog = async () => {
    await axios.get(`${url}/blog/view-blog/`+ id)
    .then((res)=>{
        setData(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
  };
  useEffect(() => {
    viewSingleblog();
  }, []);
  return (
    <>
    
    <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-5 product-single-img" style={{marginTop:'15px'}} >
            {/* <img src={Data.product_image} alt="" /> */}
            <img src={`/images/blog/${Data.blog_image}`} style={{objectFit: 'cover'}} width='50%' height='300px' alt="" />
            {/* <div className='d-flex'>
            <p style={{fontSize : '18px', marginTop:'15px'}} className='px-3'>Date : {Data.blog_date} </p>
            <p style={{fontSize : '18px', marginTop:'15px' }} className='px-3'>By : {Data.blog_writername}</p>
            </div> */}
            
          </div>
          <div className="col-7 product-single-body" style={{marginTop:'25px'}} >
            <h2 style={{fontFamily:"'Jost',sans-serif", fontSize:"35px"}}>{Data.blog_title}</h2>
            <hr />
            <p style={{fontSize : '22px',}}>
               {Data.blog_desc}</p>
            <hr />
            <p style={{fontSize : '22px',}}>
               {Data.blog_fulldesc}</p>
               <hr/>
               <div className='d-flex'>
            <p style={{fontSize : '20px',}} className='px-3'>Date : {Data.blog_date} </p>
            <p style={{fontSize : '20px', }} className='px-3'>By : {Data.blog_writername}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='p-5'></div>
      <Scroll />
      <Footer />
    </>
  )
}

export default Blogsingles
