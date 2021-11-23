import "./App.css";
import ContestCards from "./component/contestCards/ContestCards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JoinContest from "./component/JoinContest/JoinContest";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./actions/user";
import MyContests from "./component/mycontests/MyContests";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import Arenas from "./component/arenas/Arenas";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./component/navbar/Navbar";
import RulesPage from "./component/RulesPage/RulesPage";

const scrollToRef = (ref) => window.scrollTo({left:0,top: ref.current.offsetTop-30, behavior: 'smooth'}) 

function App() {
  const dispatch = useDispatch();

  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  useEffect(() => {
   
    auth.onAuthStateChanged((authUser) => {
      
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
          <Route path="/rules">
            <RulesPage/>
          </Route>
          <Route path="/">
            <Home executeScroll={executeScroll}/>
            <Arenas myRef={myRef} />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
