import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "./Chat.css";
import { FirebaseContext } from "../../store/Context";
function Chat() {
  const { firebase } = useContext(FirebaseContext);
  const [chatlist, setChatlist] = useState([])
  const [textvalue, setTextvalue] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  let chatter, userId;
  let postDetails = JSON.parse(localStorage.getItem("postDetails"));
  if (location.user) {
    chatter = location.user;
    userId = location.send;
    localStorage.setItem("chatter", JSON.stringify(chatter));
    localStorage.setItem("chatterId", location.send);
  } else {
    chatter = JSON.parse(localStorage.getItem("chatter"));
    userId = localStorage.getItem("chatterId");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("messages")
      .add({
        createdAt: new Date(),
        chatterId: chatter.id,
        userId,
        text: textvalue,
        Id: userId + chatter.id,
      });
    firebase.firestore().collection("notifications").add({
      createdAt: new Date(),
      chatterId: chatter.id,
      userId,
      text: textvalue,
    });
    firebase
    .firestore()
    .collection("chatlist").where('Id','in',[userId+chatter.id,chatter.id+userId])
      .onSnapshot((Snapshot) => {
        console.log(Snapshot.docs.length);
        if (Snapshot.docs.length == 0)
        {
          firebase.firestore().collection("chatlist").add({
            createdAt: new Date(),
            Id: userId + chatter.id,
            image: chatter.url,
            name:chatter.username
          });
        }
    });
    setTextvalue("");
  };
  useEffect(() => {
    firebase.firestore().collection("chatlist")
    firebase
      .firestore()
      .collection("messages")
      .where("Id", "in", [userId + chatter.id, chatter.id + userId])
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(data);
      });
  }, []);
  return (
    <div>
      <Header />
      <br />
      <div className="parentdivv">
        <div className="parentpeople">
          <div className="peoplehead">
            <div className="inbox">INBOX</div>
            <div className="search">
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                fill="#637877"
              >
                <path
                  className="rui-77aaa"
                  d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"
                />
              </svg>
            </div>
          </div>

          <div className="people">
            <div className="chatperson">
              <div className="imagee">
                <img
                  className="image1"
                  src={postDetails.url}
                  alt=""
                  srcset=""
                />
              </div>
              <div className="chatdetails">
                <div className="name">{chatter.username}</div>
                <div className="lastmessage">
                  Ad sasssssssssssssssssssssssssssssssssstitle
                </div>
              </div>
              <div className="moredetails">
                <div className="day">{timeAgo.format(new Date())}</div>
              </div>
            </div>
          </div>
        </div>
        {messages && (
          <div className="chatbox">
            {/* <div className="chatbox1">
         <center><img className="chatboximg" src="../images/emptychat.webp" alt="image"  /><br />
         <span>Select a chat to view conversation</span></center> 
         </div> */}
            <div className="chatboxhead">
              <img className="imagechatboxhead" src={postDetails.url} alt="" />
              <div className="chatboxname">
                {chatter.username}{" "}
                <p style={{ fontWeight: 300 }}>{postDetails.name}</p>
              </div>
            </div>
            {messages.map((message) => (
              <li key={message.id}>{message.text}</li>
            ))}

            <form>
              <input
                className="message"
                value={textvalue}
                onChange={(e) => {
                  e.preventDefault();
                  setTextvalue(e.target.value);
                }}
                placeholder="say something nice"
              />
              <button hidden onClick={handleSubmit}>
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
