import './App.css';
import * as FirebaseService from './services/firestore.service';
import * as Auth from "firebase/auth";

import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from './configs/firebase.config';
import { signInWithPopup } from 'firebase/auth';
import { login, logout } from './services/auth.service';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Regiao from './pages/regiao';
import Salas from './pages/salas';
import Usuarios from './pages/usuarios';

function App() {
  // Declare a new state variable, which we'll call "count"

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userActive, setUserActive] = useState(true);

  const [user, setUser] = useState(auth.currentUser);

  const getUser = () => {
    login().then(u => setUser(u))
  }

  const clearUser = () => {
    logout().then(u => setUser(u))
  }

  return (
    <div>
      <button onClick={user ? clearUser : getUser}>
        { user ? "Logout" : "Login" }
      </button>
      <Router>
        <Routes>
          <Route path="/regiao" element={<Regiao />}></Route>
          <Route path="/salas" element={<Salas  />}></Route>
          <Route path="/salas/:regiao" element={<Salas  />}></Route>
          <Route path="/usuarios" element={<Usuarios  />}></Route>
        </Routes>
      </Router>
      <br></br>
      {/* <br></br>
      <span> User UID: </span><input onChange={
        (e) => setUserId(e.target.value)
      }></input>
      <br></br>
      <span> User role: </span><input onChange={
        (e) => setUserRole(e.target.value)
      }></input>
      <br></br>
      <span> User Active: </span><input type="checkbox" checked={userActive} onChange={
        (e) => setUserActive(e.target.checked)
      }></input>
      <br></br>
      <br></br>
      <button onClick={() => FirebaseService.getAll({
        collection: 'users'
      }).then(k => console.log(k))}>
        getAllUsers
      </button>
      <button onClick={() => FirebaseService.createUser({
        uid: user?.uid ?? undefined,
        email: user?.email ?? undefined,
        name: user?.displayName ?? undefined,
      }).then(k => console.log(k))}>
        createUser
      </button>
      {/*
      <button onClick={() => FirebaseService.includeUserInRegion({
        uid: userId,
        regions: [regionName],
      }).then(k => console.log(k))}>
        includeUserInRegion
      </button>
      <button onClick={() => FirebaseService.removeUserFromRegion({
        uid: userId,
        regions: [regionName],
      }).then(k => console.log(k))}>
        removeUserFromRegion
      </button>
      
      <button onClick={() => FirebaseService.updateUserRole({
        uid: userId,
        role: userRole,
      }).then(k => console.log(k))}>
        updateUserRole
      </button>
      <button onClick={() => FirebaseService.updateUserActivation({
        uid: userId,
        active: userActive,
      }).then(k => console.log(k))}>
        updateUserActivation
      </button>
      <br></br>
      <br></br>
      <button onClick={() => FirebaseService.getAll({
        collection: 'roleSolicitations'
      }).then(k => console.log(k))}>
        getAllRoleSolicitations
      </button>
      <button onClick={() => FirebaseService.createOrUpdateRoleSolicitation({
        uid: user?.uid ?? undefined,
        role: userRole,
      }).then(k => console.log(k))}>
        createOrUpdateRoleSolicitation
      </button>
      <button onClick={() => FirebaseService.deleteRoleSolicitation({
        uid: user?.uid ?? undefined,
      }).then(k => console.log(k))}>
        deleteRoleSolicitation
      </button>
      <br></br>
      <br></br>
      <button onClick={() => FirebaseService.getAll({
        collection: 'regionSolicitations'
      }).then(k => console.log(k))}>
        getAllRegionSolicitations
      </button>
      <button onClick={() => FirebaseService.createOrUpdateRoleSolicitation({
        uid: user?.uid ?? undefined,
        role: userRole,
      }).then(k => console.log(k))}>
        createOrUpdateRegionSolicitation
      </button>
      <button onClick={() => FirebaseService.deleteRoleSolicitation({
        uid: user?.uid ?? undefined,
      }).then(k => console.log(k))}>
        deleteRegionSolicitation
      </button>
      */ }
    </div>
    
  );
}

export default App;