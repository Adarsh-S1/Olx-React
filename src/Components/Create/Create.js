import React, { useContext, useState } from "react";
import "./Create.css";
import { useHistory } from "react-router-dom";
import { FirebaseContext, AuthContext } from "../../store/Context";
const Create = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statee, setStatee] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setneighbourhood] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  let sellerprofile="";
  {user &&firebase.firestore().collection('users').where('id','==',user.uid).get().then((res)=>{
    res.forEach(doc => {
      sellerprofile=doc.data().url;
    });
  })}
  const handleSubmit = () => {
    firebase
      .storage()
      .ref(`/image/${image.name}/`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            title,
            description,
            statee,
            city,
            neighborhood,
            price,
            category,
            url,
            sellerprofile,
            userId: user.uid,
            createdAt: new Date().toDateString(),
          });
          history.push("/");
        });
      });
  };
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };

  return (
    <div className="parentdiv">
      <br /><br /><br /><br /><br />
      <center>
        <h1 className="boxheading">post your ad</h1>
      </center>
      <div className="box">
        <div className="categoryhead">INCLUDE SOME DETAILS</div>
        <hr />
        <div className="inputboxes">
          <label>Category</label> <br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name=""
            id=""
          >
            <option value=""></option>
            <option value="Vehicles">Vehicles</option>
            <option value="Houses and Apartments">Houses and Apartments</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics & Appliances">
              Electronics & Appliances
            </option>
            <option value="Furniture">Furniture</option>
            <option value="Pets">Pets</option>
          </select>
          <br />
          <label>Brand</label> <br />
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            name=""
            id=""
          >
            <option value=""></option>
            <hr />
            <optgroup label="Popular Brand"></optgroup>
            <hr />
            <option value="iphone">iPhone</option>
            <option value="samsung">Samsung</option>
            <option value="mi-phone">Mi</option>
            <option value="vivo-phone">Vivo</option>
            <option value="oppo-phone">Oppo</option>
            <option value="realme">Realme</option>
            <hr />
            <optgroup label="All Brand"></optgroup>
            <hr />
            <option value="asus">Asus</option>
            <option value="phones-blackberry">BlackBerry</option>
            <option value="gionee-phone">Gionee</option>
            <option value="google-pixel">Google Pixel</option>
            <option value="honor">Honor</option>
            <option value="htc">HTC</option>
            <option value="huawei">Huawei</option>
            <option value="infinix">Infinix</option>
            <option value="intex">Intex</option>
            <option value="iphone">iPhone</option>
            <option value="karbonn">Karbonn</option>
            <option value="lava">Lava</option>
            <option value="lenovo-mobile">Lenovo</option>
            <option value="lg">LG</option>
            <option value="mi-phone">Mi</option>
            <option value="micromax">Micromax</option>
            <option value="motorola-phone">Motorola</option>
            <option value="nokia">Nokia</option>
            <option value="one-plus">One Plus</option>
            <option value="oppo-phone">Oppo</option>
            <option value="realme">Realme</option>
            <option value="samsung">Samsung</option>
            <option value="sony">Sony</option>
            <option value="techno">Techno</option>
            <option value="vivo-phone">Vivo</option>
          </select>
          <br />
          <label>Ad Title</label> <br />
          <input onChange={(e)=>{setTitle(e.target.value)}} value={title}
            style={{ width: "50%" }}
            maxLength="70"
            type="text"
            name=""
            id=""
          />
          <br />
          <small>
            Mention the key features of your item (e.g. brand, model, age, type)
          </small>
          <br />
          <label style={{ marginTop: "30px" }}>Description</label> <br />
          <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description}
            name=""
            id=""
            cols="54"
            rows="10"
            maxLength="4000"
          ></textarea>
          <br />
          <hr style={{ marginLeft: "-30px" }} />
          <div className="pricehead">SET A PRICE</div>
          <div className="customborder">
            <span style={{ marginLeft: "4px" }}>
              <span className="lineprice"> ₹</span>
            </span>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="priceinput"
              type="number"
              name=""
              id=""
            />
            <br />
          </div>
          <hr style={{ marginLeft: "-30px" }} />
          <div className="pricehead">UPLOAD A PHOTO</div>
          {image ? (
            <div>
              <img
                alt="Image"
                width="200px"
                height="200px"
                src={image ? URL.createObjectURL(image) : ""}
              ></img>
              <br />
              <br />
              <button
                onClick={(e) => {
                  setImage(null);
                }}
                className="cancelbutton"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div onClick={handleClick} className="photo">
              <div style={{ color: "#002f34" }}>
                <button
                  type="button"
                  className="photo2"
                  role="button"
                  tabIndex="0"
                >
                  <svg
                    width="36px"
                    height="36px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fill="#002f34"
                  >
                    <path
                      className="rui-2qwuD"
                      d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"
                    ></path>
                  </svg>
                </button>
                <div className="photo3">
                  <span>Add photo</span>
                </div>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <hr style={{ marginLeft: "-30px" }} />
          <div className="pricehead">CONFIRM YOUR LOCATION</div>
          <label>State</label> <br />
          <select onChange={(e)=>{setStatee(e.target.value)}} value={statee} name="" id="">
          <option value=""></option>
          <option value="Tarur">Tarur</option>
          </select>
          <br />
          <label>City</label> <br />
          <select onChange={(e)=>{setCity(e.target.value)}} value={city} name="" id="">
          <option value=""></option>
          <option value="Tarur">Tarur</option>
          </select>
          <br />
          <label>Neighbourhood</label> <br />
          <select onChange={(e)=>{setneighbourhood(e.target.value)}} value={neighborhood} name="" id="">
          <option value=""></option>
          <option value="Tarur">Tarur</option>
          </select>
          <hr style={{ marginLeft: "-30px" }} />
          <button onClick={handleSubmit} className="submitbutton">Post now</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
