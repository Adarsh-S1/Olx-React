import React, { useEffect, useState, useContext } from "react";
import { useHistory} from "react-router-dom";
import { FirebaseContext ,AuthContext} from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import "./View.css";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { user } = useContext(AuthContext);
  let postDetails = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  postDetails = postDetails.postDetails;
  if (postDetails) {
    localStorage.setItem("postDetails", JSON.stringify(postDetails));
  } else {
    postDetails = JSON.parse(localStorage.getItem("postDetails"));
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", postDetails.userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  }, []);
  return (
    <div className="divide">
      <div className="picture">
        <div className="picture2">
          <div className="picture3">
            <div className="picture4">
              <div className="picture5">
                {postDetails && (
                  <img
                    className="img-fluid"
                    src={postDetails.url}
                    alt=""
                    srcset=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="Descriptionbox">
          <div className="Descriptionbox1" tabindex="0" role="button">
            <div className="Descriptionbox2">
              <h3>
                <span>Details</span>
              </h3>
              <div className="Descriptionbox3">
                <div className="Descriptionbox4">
                  <div className="Descriptionbox5">
                    <div className="Descriptionbox6">
                      <span className="Brand">Category</span>
                      <span className="Brandname" data-aut-id="value_make">
                        {postDetails.category}
                      </span>
                    </div>
                    <div className="Descriptionbox6">
                      <span className="Brand">Brand</span>
                      <span className="Brandname" data-aut-id="value_make">
                        {postDetails.name}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <h3>
                <span>Key Features</span>
              </h3>
              <div data-aut-id="Descriptionbox3">
                <p>{postDetails.title}</p>
              </div>
              <h3>
                <span>Description</span>
              </h3>
              <div data-aut-id="Descriptionbox3">
                <p>{postDetails.description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="productbox">
        <div className="productbox1">
          <div className="productbox2">
            <section className="productbox3">
              {postDetails && (
                <span className="productbox4">₹ {postDetails.price}</span>
              )}
              <h1 className="productbox5">Refurbished Iphone 6 Available.</h1>
              <div className="productbox6">
                <div className="productbox7">
                  {postDetails.neighborhood}, {postDetails.city},{" "}
                  {postDetails.statee}
                </div>
                <span>{postDetails.createdAt.substring(4)}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="sellerbox">
        <div className="sellerbox1">
          <div className="sellerbox2"></div>
          <section className="sellerbox3">
            <span className="sellerbox4">Seller Description</span>
              <div onClick={(e) => {
                history.push({pathname:"/viewprofile",userId:userDetails.id})
              }}
              className="profilecard"
            >
             
              {postDetails && (
                <img
                  src={postDetails.sellerprofile}
                  style={{
                    width: " 68px",
                    height: " 68px",
                    borderRadius: "90%",
                  }}
                ></img>
              )}
              <div className="profilecard1">
                {userDetails && (
                  <div className="profilecard2">{userDetails.username}</div>
                )}
                <span className="profilecard3">
                  <svg
                    width="18px"
                    height="18px"
                    style={{ overflow: "hidden" }}
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fillRule="evenodd"
                  >
                    <path
                      className="rui-4K4Y7"
                      d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"
                    ></path>
                  </svg>
                </span>
                <div style={{ textAlign: "left" }}>
                  <div data-aut-id="memberSince">
                    <div className="profilecard4">
                      {userDetails && (
                        <span>
                          Member since{" "}
                          <span>{userDetails.createdAt.substring(4)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
           {userDetails && <button type="button"  onClick={(e) => {
              history.push({ pathname: "/chat", user: userDetails ,send:user.uid})
              }} className="chatbutton">
              <span>Chat with seller</span>
            </button>}
            <button type="button" className="chatbutton1">
              <span>Make an offer</span>
            </button>
          </section>
        </div>
      </div>
      <div style={{ marginTop: "10px" }} className="productbox">
        <div className="productbox1">
          <div className="productbox2">
            <section className="productbox3">
              <span className="productbox4">Posted in</span>
              <div className="productbox6">
                <div className="productbox7">
                  {postDetails.neighborhood}, {postDetails.city},{" "}
                  {postDetails.statee}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>  
  );
}
export default View;
