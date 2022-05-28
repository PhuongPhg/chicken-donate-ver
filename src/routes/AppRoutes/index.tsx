import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientRoutesEnum } from 'enums/routes';
import Layout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Creation from 'pages/Creation';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ClientRoutesEnum.HOME} element={<Layout RenderComponent={Home} />} />
      <Route path={ClientRoutesEnum.PROFILE} element={<Layout RenderComponent={Profile} />} />
      <Route path={ClientRoutesEnum.PROFILE} element={<Layout RenderComponent={Profile} />} />
      <Route path={ClientRoutesEnum.CREATE} element={<Layout RenderComponent={Creation} />} />
    </Routes>
  );
}

export default AppRoutes;
