import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import Bell from "../../assets/Bell";
import Chat from "../../assets/Chat";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { Dropdown } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

function Header() {
  const { user } = useContext(AuthContext);
  const [showform, setShowform] = useState(false);
  const [signupform, setSignupform] = useState(false);
  const [showError, setShowerror] = useState("");
  const [showsignupError, setShowsignuperror] = useState("");
  const [username, setUsername] = useState("");
  const [emailsignup, setEmailsignup] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordsignup, setPasswordsignup] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [userdetails, setUserdetails] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleSignup = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailsignup, passwordsignup)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", result.user.uid)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              setUserdetails(doc.data());
            });
          });

        firebase
          .storage()
          .ref(`/userimage/${result}/`)
          .put(image)
          .then(({ ref }) => {
            ref.getDownloadURL().then((url) => {
              result.user.updateProfile({ displayName: username });

              firebase.firestore().collection("users").doc(result.user.uid).set({
                id: result.user.uid,
                email: emailsignup,
                username,
                phone,
                url,
                createdAt: new Date().toDateString(),
              });
              setSignupform(false);
              setLoading(false);
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        setShowsignuperror(error.message);
      });
  };
  const handleLogin = (e) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", result.user.uid)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              setUserdetails(doc.data());
            });
          });
        setShowform(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setShowerror(error.message);
      });
    e.preventDefault();
  };

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };
  {
    user &&
      !userdetails &&
      firebase
        .firestore()
        .collection("users")
        .where("id", "==", user.uid)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserdetails(doc.data());
          });
        });
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &nbsp;
      <Arrow></Arrow>
    </a>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <span className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </span>
        </div>
      );
    }
  );

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <div className="placeSearchIcon">
            <Search></Search>
          </div>
          <div className="placeSearchPlace">
            <input type="text" placeholder="Search city, area or loc..." />
          </div>
          <div className="placeSearchArrow">
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <Dropdown.Menu as={CustomMenu}>
                  <div className="locationbox">
                    <div className="locationbox1">
                      <svg
                        style={{ marginRight: "10px" }}
                        width="25px"
                        height="25px"
                        viewBox="0 0 1024 1024"
                        data-aut-id="icon"
                        fill="#12808c"
                      >
                        <path
                          className="rui-77aaa"
                          d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"
                        ></path>
                      </svg>
                      asd
                    </div>
                    <div className="locationbox1">
                      <svg
                        style={{ marginRight: "10px" }}
                        width="25px"
                        height="25px"
                        viewBox="0 0 1024 1024"
                        data-aut-id="icon"
                        fill="#12808c"
                      >
                        <path
                          className="rui-77aaa"
                          d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"
                        ></path>
                      </svg>
                      asd
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="chat">
        <button style={{  all: "unset"} } type="button"  onClick={(e) => {
              history.push({ pathname: "/chat"})
              }} ><Chat ></Chat></button> 
          {/* {userDetails && <button type="button"  onClick={(e) => {
              history.push({ pathname: "/chat", user: userDetails ,send:user.uid})
              }} className="chatbutton"></button> */}
        </div>
        <div className="bell">
          <Bell></Bell>
        </div>

        <div className="loginPage">
          <span>
            {user ? (
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  {userdetails && (
                    <img
                      style={{
                        height: "35px",
                        width: "35px",
                        borderRadius: "50%",
                      }}
                      src={userdetails.url}
                    ></img>
                  )}
                  <Dropdown.Menu as={CustomMenu}>
                    <div className="dropdownprofile">
                      <div className="profiledetails">
                        {userdetails && (
                          <img
                            className="figure"
                            src={userdetails.url}
                            alt=""
                            srcset=""
                          />
                        )}
                        <div className="profileditmain">
                          <span className="Hello">Hello ,</span>

                          {userdetails && (
                            <div className="Name">{userdetails.username}</div>
                          )}
                          <span onClick={(e) => {
              history.push({ pathname: "/editprofile"})
              }}  className="viewedit">
                            <span>View and edit profile</span>
                          </span>
                        </div>
                      </div>
                      <div className="logout">
                        <div
                          onClick={() => {
                            signout();
                          }}
                          className="logoutbutton"
                        >
                          <svg
                            width="23px"
                            height="23px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                          >
                            <path
                              className="rui-77aaa"
                              d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"
                            ></path>
                          </svg>
                          &nbsp;&nbsp;&nbsp;&nbsp;Logout
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
            ) : (
              <div
                onClick={(e) => {
                  setShowform(true);
                  e.preventDefault();
                }}
              >
                Login
              </div>
            )}
          </span>
          {user ? "" : <hr></hr>}
        </div>
        <div
          onClick={(e) => {
            history.push("/create");
            e.preventDefault();
          }}
          className="sellMenu"
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
      <div className="menuBar">
        <div className="categoryMenu">
          <span>ALL CATEGORIES</span>
          <Arrow></Arrow>
        </div>
        <div className="otherQuickOptions">
          <span>Cars</span>
          <span>Motorcycles</span>
          <span>Mobile Phones</span>
          <span>For Sale:Houses & Apartments</span>
          <span>Scooters</span>
          <span>Commercial & Other Vehicles</span>
          <span>For Rent: House & Apartments</span>
        </div>
      </div>
      {loading && (
        <div className="loader">
          <ClipLoader
            color="#94fff8cc"
            css={`
              display: block;
            `}
            size={80}
          />
        </div>
      )}
      {showform ? (
        <div className="form">
          <div className="form1">
            <span
              onClick={(e) => {
                setShowform(false);
                setShowerror("");
                e.preventDefault();
              }}
              className="formclose"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                fill="#6c878a"
              >
                <path
                  className="rui-32D-k"
                  d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"
                ></path>
              </svg>
            </span>
            <form onSubmit={handleLogin}>
              <div className="form3">
                <div className="logo">
                  <svg
                    width="60px"
                    height="60px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                  >
                    <path
                      className="rui-l7uK1"
                      d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
                    ></path>
                  </svg>
                </div>
                <h3 className="formhead">
                  <span>Enter your email to login</span>
                </h3>
                <div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            autocomplete="email"
                            placeholder="Email"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            autocomplete="password"
                            placeholder="Password"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                    <center>
                      <p className="Error">{showError}</p>
                    </center>
                  </div>
                  <center>
                    <p className="signup">
                      <span>
                        Don't have an account yet ?&nbsp;
                        <u
                          style={{ cursor: "pointer", fontWeight: "900" }}
                          onClick={(e) => {
                            setShowform(false);
                            setShowerror("");
                            setSignupform(true);
                            e.preventDefault();
                          }}
                        >
                          Sign Up
                        </u>
                      </span>
                    </p>
                  </center>
                </div>
                <hr />
                <button type="submit" className="buttonnext">
                  <span>Login</span>
                </button>
              </div>
              <p className="info">
                <span>
                  We won't reveal your email to anyone else nor use it to send
                  you spam
                </span>
              </p>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {signupform ? (
        <div className="form">
          <div style={{ overflowY: "scroll" }} className="form1">
            <span
              onClick={(e) => {
                setShowform(false);
                setSignupform(false);
                setShowsignuperror("");
                setShowerror("");
                e.preventDefault();
              }}
              className="formclose"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                fill="#6c878a"
              >
                <path
                  className="rui-32D-k"
                  d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"
                ></path>
              </svg>
            </span>
            <form onSubmit={handleSignup}>
              <div className="form3">
                <div className="logo">
                  <svg
                    width="60px"
                    height="60px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                  >
                    <path
                      className="rui-l7uK1"
                      d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
                    ></path>
                  </svg>
                </div>
                <h3 className="formhead">
                  <span>Enter your details to signup</span>
                </h3>
                <div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            autoFocus
                            value={emailsignup}
                            onChange={(e) => setEmailsignup(e.target.value)}
                            name="email"
                            type="email"
                            autocomplete="email"
                            placeholder="Email"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form4">
                    <label for="username"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            type="username"
                            autocomplete="username"
                            placeholder="Username"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            onChange={(e) => setPasswordsignup(e.target.value)}
                            name="password"
                            type="password"
                            autocomplete="password"
                            placeholder="Password"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            name="email"
                            type="phone"
                            autocomplete="phone"
                            placeholder="Phone"
                            className="emailinput"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form4">
                    <label for="email"></label>
                    <div className="form5">
                      <div className="form6">
                        <div className="form7">
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                          />
                          <div className="form8"></div>
                        </div>
                      </div>
                    </div>
                    {image && (
                      <center>
                        <img
                          style={{ marginTop: "10px" }}
                          width="auto"
                          height="200px"
                          src={image ? URL.createObjectURL(image) : ""}
                        ></img>
                      </center>
                    )}
                  </div>
                </div>
                <hr />
                <button type="submit" className="buttonnext">
                  <span>Signup</span>
                </button>
              </div>
              <center>
                <p className="Errorsignup">{showsignupError}</p>
              </center>

              <p style={{ marginTop: "30px" }} className="info">
                <span>
                  We won't reveal your email to anyone else nor use it to send
                  you spam
                </span>
              </p>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
