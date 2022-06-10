import React, { useEffect ,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context'
import Create from './Pages/Create'
import View from './Pages/ViewPost';
import Post from './store/PostContext'
import Viewprofile from './Components/Viewprofile/viewprofile'
import Editprofile from './Components/Editprofile/Editprofile.js'
import Chat from './Components/Chat/Chat';
function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
     setUser(user)
    })
  },[])
  return (
    <div>
<Post>
      <Router>
        <Route exact path="/">
      <Home />
      </Route>

      <Route path="/create">
      <Create/>
      </Route>

      <Route path="/view">
      <View/>
      </Route>
      
      <Route path="/viewprofile">
      <Viewprofile />
          </Route>
          
      <Route path="/editprofile">
      <Editprofile />
          </Route>
          
      <Route path="/chat">
      <Chat/>
      </Route>
      </Router>
</Post>
    </div>
  );
}

export default App;
