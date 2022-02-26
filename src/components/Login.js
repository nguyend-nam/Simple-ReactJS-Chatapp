import React from 'react';
import {GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import 'firebase/app';

import {auth} from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
  return(
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to <span className="darkblue">one</span><span className="lightblue">Chat</span></h2>
        <div className="login-button google"
             onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
          <span><GoogleOutlined /> Sign in with Google</span>
        </div>
        <div className="login-button github"
             onClick={()=>auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())}>
          <span><GithubOutlined /> Sign in with GitHub</span>
        </div>
      </div>

      <div id="copyright">
        <span>&copy; 2022 <a target="_blank" rel="noopener noreferrer" href="https://github.com/NguyenD-Nam">Dinh Nam Nguyen</a></span>
      </div>
    </div>
  );
}

export default Login;
