import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../firebase"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }

      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: {
          "project-id": "...",
          "user-name": user.displayName,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.displayName)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": "..." }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])


  if (!user || loading)
    return(
      <div id="login-page">
        <div id="login-card">
          <h2><span className="lightblue">Loading</span><span className="darkblue">...</span></h2>
          <div onClick={handleLogout} className='logout-tab'>
            <span>Back to Sign in page</span>
          </div>
          <br/>
        </div>

        <div id="copyright">
          <span>&copy; 2022 <a target="_blank" rel="noopener noreferrer" href="https://github.com/NguyenD-Nam">Dinh Nam Nguyen</a></span>
        </div>
      </div>
    );

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          <h2>oneChat</h2>
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          <span>Log out</span>
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 69px)'
        projectID="..."
        userName={user.displayName}
        userSecret={user.uid}
      />
    </div>
  )
}
