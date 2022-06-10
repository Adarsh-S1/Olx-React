import React,{useState,useContext,useEffect} from 'react';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';
import {useHistory} from 'react-router-dom'
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
function Posts() {
 const {firebase}=useContext(FirebaseContext)
 const [products, setProducts] = useState([])
 const [slides, setSlides] = useState(0)
 const{setPostDetails}=useContext(PostContext)
 const history=useHistory() 
 SwiperCore.use([Mousewheel, Pagination]);
 let screenwidth=0;
 useEffect(() => {
   firebase.firestore().collection('products').get().then((snapshot)=>{
    const allPost=snapshot.docs.map((product)=>{
      return {
        ...product.data(),
        id:product.id
      }
    })
    screenwidth = Math.trunc(window.innerWidth)
    screenwidth<700?setSlides(1):setSlides(4)
     setProducts(allPost)
   })
 }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        <Swiper
          direction={"horizontal"}
          slidesPerView={slides}
          spaceBetween={0}
          mousewheel={true}
          pagination={{
            "type": "none"
          }}
          className="mySwiper"
        >
          {products.map((product)=>{
             return <SwiperSlide>

       <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              history.push('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
              <span className="place">{product.city}</span>

            </div>
            <div className="date">
              <span style={{  color:"grey"}}>{(product.createdAt).substring(4)}</span>
            </div>
          </div>
          </SwiperSlide>
          
          })
        }
                  </Swiper>

        </div>
      </div>
      <div className="recommendations">
        <div className="headingfresh">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map(product=>{
            
            return <div
              className="card"
              onClick={()=>{
                setPostDetails(product)
                history.push('/view')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
                <span className="place">{product.city}</span>
  
              </div>
              <div className="date">
                <span style={{  color:"grey"}}>{(product.createdAt).substring(4)}</span>
              </div>
            </div>
               })
              }
        </div>
      </div>
    </div>
  );
}

export default Posts;
