import React, { useContext, useEffect ,useState} from "react";
import Header from "../Header/Header";
import "./editprofile.css";
import { FirebaseContext, AuthContext } from "../../store/Context";

const Editprofile = () => {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutme, setAboutme] = useState("");
  function handleSubmit(){
  {
    {
      user && firebase.firestore().collection("users").doc(user.uid).set({
      
        username,
        aboutme,
        phone,
        email
      }, { merge: true });
    }
  }
}


  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="parentbox">
        <div className="profilehead">EDIT PROFILE</div>
        <hr />
        <div className="inputboxprofile">
          <div className="inputboxprofile1" style={{ width: "50%" }}>
            <label>Basic Information</label> <br />
            <br />
            <input
              style={{ width: "100%" }}
              maxLength="70"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name=""
              id=""
            />
            <br />
            <br />
            <textarea
              placeholder="About me (optional)"
              name=""
              id=""
              cols="63"
              onChange={(e) => setAboutme(e.target.value)}
              rows="3.5"
              maxLength="4000"
            ></textarea>
            <br />
          </div>
          <div className="inputboxprofile2" style={{ width: "50%" }}>
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              class=""
              fill-rule="evenodd"
            >
              <path
                class="rui-4K4Y7"
                d="M318.061 279.272h-54.847l-61.517-61.517v-54.847h54.847l61.517 61.517v54.847zM512 240.485l-38.789-38.789v-77.575l38.789-38.789 38.789 38.789v77.575l-38.789 38.789zM938.667 473.211l-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575l38.789 38.789zM201.697 434.425l38.789 38.789-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575zM822.303 217.755l-61.517 61.517h-54.847v-54.847l61.517-61.517h54.847v54.847zM621.73 621.73c-13.848 13.809-29.867 24.747-47.67 32.505l-23.272 35.569v54.924h-77.575v-54.924l-23.272-35.53c-17.804-7.757-33.823-18.734-47.67-32.582-60.47-60.47-60.47-158.913 0-219.385 60.51-60.51 158.952-60.51 219.462 0 60.47 60.47 60.47 158.913 0 219.385zM473.211 861.091h77.575v-38.789h-77.575v38.789zM512 279.272c-62.177 0-120.63 24.204-164.538 68.19-90.764 90.725-90.764 238.351 0 329.115 14.507 14.469 30.643 26.919 48.174 37.043v186.259l38.789 38.789h155.151l38.789-38.789v-186.259c17.57-10.163 33.669-22.574 48.174-37.081 90.764-90.725 90.764-238.391 0-329.115-43.909-43.909-102.323-68.15-164.538-68.15z"
              ></path>
            </svg>
            <h6>Why it is important?</h6>
            <p>
              OLX is built on trust. Help other people get to know you. Tell
              them about the things you like. Share your favorite brands, books,
              movies, shows, music, food. And you will see the results…
            </p>
          </div>
        </div>
        <hr />
        <div className="profilehead">Contact information</div>
        <div className="inputboxprofile">
          <div className="inputboxprofile1" style={{ width: "50%" }}>
            <label>Basic Information</label> <br />
            <br />
            <input
              style={{ width: "100%" }}
              maxLength="70"
              placeholder="Phone number"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              name=""
              id=""
            />
            <br />
            <br />
            <input
              type="email"
              placeholder="Email"
              name=""
              cols="63"
              rows="3.5"
              onChange={(e) => setEmail(e.target.value)}
              maxLength="4000"
            ></input>
            <br />
          </div>
          <div className="inputboxprofile2" style={{ width: "50%" }}>
            <p>
              This is the number for buyers contacts, reminders, and other
              notifications.
            </p>
          </div>
        </div>
        <hr />
        <button onClick={handleSubmit}
          style={{ float: "right", marginRight: "20px" }}
          className="submitbutton"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Editprofile;
