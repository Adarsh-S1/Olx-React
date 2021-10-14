import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Heart from "../../assets/Heart";
import "../Viewprofile/viewprofile.css";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";

function Viewprofile() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const [userdetails, setUserdetails] = useState();
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  let userId = location.userId;
  if (location.userId) localStorage.setItem("profileUid", location.userId);
  else userId = localStorage.getItem("profileUid");
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserdetails(doc.data());
        });
      });
    firebase
      .firestore()
      .collection("products")
      .where("userId", "==", userId)
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
      });
  }, []);

  return (
    <div className="parentdiv">
      <Header />
      <br />
      <br />
      <br />
      {userdetails && (
        <div className="profileheader">
          <div className="profileheader1">
            <div className="profileheader2">
              <div className="profileheader3">
                <img
                  className="profile"
                  src={userdetails?.url}
                  alt=""
                  srcset=""
                />
              </div>

              <div className="profileheader4">
                <h3 className="profilename">{userdetails?.username}</h3>
                <div className="profilename1">
                  <span className="profilename2">Share profile link</span>
                  <span className="profilename3">Report user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="productshead">Published Ads</div>
      <div className="seperator">
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  history.push("/view");
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
                  <span style={{ color: "grey" }}>
                    {product.createdAt.substring(4)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="usercards">
        <div className="followers">Friends</div>
          <div className="seperator2">
            <div className="follow">
            <div className="followers2">Followers</div>
            <div className="followers2">Following</div>
            </div>
            <div className="follownos">
            <div>gfj</div>
            <div className="followno">sdf</div>
            </div>
          </div>
          {userdetails &&<center><span className="member">Member since {userdetails.createdAt.substring(4)}</span></center>} 

        </div>
      </div>
      {userdetails && <Footer />}
    </div>
  );
}

export default Viewprofile;
