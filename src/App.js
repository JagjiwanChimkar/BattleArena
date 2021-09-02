import "./App.css";
import ContestCards from "./component/contestCards/ContestCards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JoinContest from "./component/JoinContest/JoinContest";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./actions/user";
import { db } from "./firebase";
import MyContests from "./component/mycontests/MyContests";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import Arenas from "./component/arenas/Arenas";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./component/navbar/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

    //   //first move upcoming_contest to end_contest in user
    // db.doc('/modes/TDM/duo/5qX4CH8xizerhhv4nk8G')
    // .get()
    // .then(res=>{
    //   db.collection('users/uxsnJZY1bTybYmaCXkoy/end_contests')
    //   .doc('5qX4CH8xizerhhv4nk8G')
    //   .set(res.data())
    // })
      

      //delete a upcoming_contest  from user
    //   db.collection("users")
    //     .doc("uxsnJZY1bTybYmaCXkoy")
    //   .update({
    //     upcoming_contest: firebase.firestore.FieldValue.arrayRemove(db.doc('/modes/TDM/duo/5qX4CH8xizerhhv4nk8G'))
    // });

    


    // //get upcoming_contest
    // db.collection("users")
    //     .doc("uxsnJZY1bTybYmaCXkoy")
    //     .get()
    //     .then((snap) =>{
        
    //       if(snap.data().upcoming_contest){
    //         snap.data().upcoming_contest.forEach(contest=>
    //           contest.get()
    //         .then((res) => console.log(res.data())))
    //       }
    //     }
    //     );

       

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch(setUser(authUser));
      } else {
        // the user is logged out
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/mycontests">
            <MyContests />
          </Route>
          <Route exact path="/contest/:mode/:category">
            <ContestCards />
          </Route>
          <Route path="/contest/:mode/:category/join/:id">
            <JoinContest />
          </Route>
          <Route path="/">
            <Home />
            <Arenas />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
