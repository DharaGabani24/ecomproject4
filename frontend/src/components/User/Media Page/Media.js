import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../Header & Footer/Footer'
import Navbar from '../Header & Footer/Navbar'
import Scroll from '../Home Pages/Scroll'
import Loading from '../Loader/Loading'
import {url} from '../../../API/api'

const Media = () => {

        const [data, setdata] = useState([]);

        useEffect(() => {
                loaddata();
        }, [])


        const loaddata = async () => {
                const result = await axios.get(`${url}/media/view-media`)
                setdata(result.data)
        }

        const [isloading, setisloading] = useState(false)
        useEffect(() => {
                setisloading(true)
                setTimeout(() => {
                        setisloading(false)
                }, 1000);
        }, [])


        return (
                <>


                        {
                                isloading ? <Loading /> :
                                        <div >

                                                <Navbar />

                                                <h2 className="text-center my-4" style={{ fontFamily: "'Jost',sans-serif", fontWeight: '450', marginTop:"10px" }}>IMAGES</h2>

                                                <div className="container">
                                                        <div className="row m-0">


                                                                {
                                                                        data.map((item, i) => {
                                                                                return (
                                                                                        <>
                                                                                                <div class="col-12 col-lg-4 col-md-6 my-1 px-1 ">
                                                                                                        <img width='100%' height='500px' style={{ objectFit: 'cover' ,height:'400px',width:"400px" ,boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", marginBottom:"20px"}} src={`/images/media/${item.media_image}`} alt="" />
                                                                                                </div>
                                                                                        </>
                                                                                )

                                                                        })
                                                                }
                                                        </div>
                                                </div>


                                                <Scroll />

                                                <Footer />

                                        </div>
                        }

                </>
        )
}

export default Media
