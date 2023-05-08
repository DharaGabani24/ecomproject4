import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Adminfooter from '../Admin Header/Adminfooter';
import Header from '../Admin Header/Header'
import './Dashboard.css'
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { url} from '../../../API/api'

const Dashboard = () => {
  const navigate = useNavigate();

  const [data,setdata] = useState([]);

  const dataload = async () =>{
    const res = await axios.get(`${url}/auth/get-users`)
      setdata(res.data)
  }

  useEffect(()=>{
    dataload();
  },[])

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
        <Header/>
        {/* <div className='container'>
        <button disabled className='btn-add' style={{backgroundColor:"lightpink",color:"black"}}onClick={(e) => navigate('')}>Add Data</button>
      </div> */}
      <div class="table-reponsive box my-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <table id="example" class="table table-striped table-bordered">
        <thead>
            <tr style={{ textAlign: 'center', fontSize: '20px' }}>
              <th colSpan={9} style={{ textAlign: 'center', fontSize: '25px',fontFamily:"'Jost',sans-serif",color:"black" , background: "linear-gradient(to bottom, #99ccff 0%, #ffccff 100%)" }}  >DASHBOARD</th>
            </tr>
          </thead>
          <thead>
            <tr style={{ textAlign: 'center'}}>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Role</th>
              {/* <th >Cart</th> */}
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>

              {
                  data.slice(pagesVisited, pagesVisited + usersPerPage).map((item,i)=>{
                    return (
                      <>
                      <tr>
                        <td>{i+1 + pagesVisited}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.role}</td>
                        {/* <td style={{ width: '60px' }}>{JSON.stringify(item.cart)}</td> */}
                        <td style={{ textAlign: 'center' , }}><Link style={{color: '#000' , fontSize: '20px'}} to={`/admin/dashboard/edit/${item._id}`}>Edit</Link></td>
                        <td style={{ textAlign: 'center' , }}> <Link style={{color: '#000' , fontSize: '20px'}}>Delete</Link></td>
                      </tr>

                      </>
                    )
                  })
              }

          </tbody>
        </table>
        <ReactPaginate
        previousLabel={<MdKeyboardArrowLeft size={25}/>}
        nextLabel={<MdKeyboardArrowRight size={25}/>}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />
      </div>
      <Adminfooter/>
      </>
  )
}

export default Dashboard