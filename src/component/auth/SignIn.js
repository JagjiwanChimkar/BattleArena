import React from "react";
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { useHistory } from "react-router-dom";
import './signIn.css';

var provider = new firebase.default.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function SignIn() {
  const user = useSelector(state => state.user)
  const history=useHistory();

 

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
      history.push('/');
    }else{
      firebase.auth()
      .signInWithPopup(provider)
      .then(result=>{
        // console.log('from signin',result.user.metadata.creationTime)
        if(result.user.metadata.creationTime===result.user.metadata.lastSignInTime){
          console.log('New User');
        }
      })
      .catch()
    }
  }

  

  return (
    <>
      <button className="signIn_btn"
      onClick={handleAuthenticaton}
      >{user ? 'Sign Out' : 'Sign In'}
      </button>
    </>
  );
}

export default SignIn;
