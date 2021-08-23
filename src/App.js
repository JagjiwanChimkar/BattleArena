import "./App.css";
import ContestCards from "./component/contestCards/ContestCards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JoinContest from "./component/JoinContest/JoinContest";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMatches } from "./actions/matches";
import NavBar from "./component/navbar/NavBar";
import { auth } from "./firebase";
import { setUser } from "./actions/user";
import Profile from "./component/profile/Profile";
import Arenas from "./component/arenas/Arenas";
import { db } from "./firebase";


function App() {
  const dispatch = useDispatch();

  

  useEffect(() => {
    console.log("app comp mounted");
    dispatch(getMatches());

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      db.collection("users")
        .doc("uxsnJZY1bTybYmaCXkoy")
        .get()
        .then((snap) => console.log(snap.data().joined_contests[0]));

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
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/contest/:mode/:category">
            <ContestCards />
          </Route>
          <Route path="/contest/:mode/:category/join/:id">
            <JoinContest />
          </Route>
          <Route path="/">
            <Arenas />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
