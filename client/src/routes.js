import React from 'react';
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import { Switch, Route, Redirect } from "react-router-dom";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch >
    )
  }
  return (
    <Switch>
      <Route path="/AuthPage" exact>
        <AuthPage />
      </Route>
      <Redirect to="/AuthPage" />
    </Switch>
  )
}

