// src/routes/HomeRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupFeed from '../pages/GroupFeed/GroupFeed';
import GroupMembers from '../pages/GroupMembers/GroupMembers';
import UserProfile from '../pages/UserProfile/UserProfile';
import Search from '../pages/Search/Search';
import CreateGroup from '../pages/CreateGroups/CreateGroup';
import Welcome from '../pages/Welcome/Welcome';
import Home from '../pages/Home';

const HomeRoutes = () => {
  return (
    <Home>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/user/" element={<UserProfile />} />
        <Route path="/group/:groupId" element={<GroupFeed />} />
        <Route path="/group/:groupId/members" element={<GroupMembers />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/create-group" element={<CreateGroup/>} />
      </Routes>
    </Home>
  );
};

export default HomeRoutes;
