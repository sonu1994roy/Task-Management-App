import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/index";
import Page404 from "./Pages/Page404";

import Protected from "./Route/ProtectedRoute";

import Profile from "./Pages/User/Profile";
import UpdatePassword from "./Pages/User/UpdatePassword";
import UpdateProfile from "./Pages/User/UpdateProfile";
import UserTask from "./Pages/User/usersTask"

import DashBord from "./Pages/dashBord/index";
import NewTeam from "./Pages/dashBord/team/createTeam";
import ListTeam from "./Pages/dashBord/team/listTeam";
import CreateTask from "./Pages/dashBord/task/createTask";
import ListTask from "./Pages/dashBord/task/listTask";
import TaskComlationHistory from "./Pages/dashBord/task/taskComlationHistory";

import store from "./store";
import { loadUser } from "./actions/userAction";
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:4000');

  useEffect(() => {
    store.dispatch(loadUser());

    socket.on('notification', (data) => {
      if (Notification.permission === 'granted') {
        new Notification('New Notification', {
          body: data.message,
        });
      }
    });

    return () => {
      socket.off('notification');
    };
  }, [socket]);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Protected />}>
          <Route path="/password/update" element={< UpdatePassword />} />
          <Route path="/me/update" element={< UpdateProfile />} />
          <Route path="/me/acount" element={< Profile />} />
          <Route path="/me/task" element={<UserTask/>} />
        </Route>
      {/* admin Routes */}
      <Route element={<Protected />}>
        <Route path="/me/dash-bord" element={<DashBord />} />
        <Route path="/Team/new-team" element={<NewTeam />} />
        <Route path="/Team/update-team/:id" element={<NewTeam />} />
        <Route path="/Team/list-team" element={<ListTeam/>} />
        <Route path="/task/create" element={<CreateTask />} />
        <Route path="/task/list" element={<ListTask />} />
        <Route path="/task/history" element={<TaskComlationHistory />} />
      </Route>


      {/* 404 Route */}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
