import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientRoutesEnum } from 'enums/routes';
import Layout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Creation from 'pages/Creation';
import About from 'pages/About';
import Privacy from 'pages/Privacy';
import Terms from 'pages/Terms';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ClientRoutesEnum.HOME} element={<Layout RenderComponent={Home} />} />
      <Route path={ClientRoutesEnum.PROFILE} element={<Layout RenderComponent={Profile} />} />
      <Route path={ClientRoutesEnum.CREATE} element={<Layout RenderComponent={Creation} />} />
      <Route path={ClientRoutesEnum.ABOUT} element={<Layout RenderComponent={About} />} />
      <Route path={ClientRoutesEnum.PRIVACY} element={<Layout RenderComponent={Privacy} />} />
      <Route path={ClientRoutesEnum.TERMS} element={<Layout RenderComponent={Terms} />} />
    </Routes>
  );
}

export default AppRoutes;
