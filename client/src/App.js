import React                        from 'react';
import { useAuth }                  from './hooks/auth.hook'
import { AuthContext }              from './context/AuthContext'
import { useRoutes }                from './routes'
import { BrowserRouter as Router }  from "react-router-dom";
import './static/css/style.css'
import './static/css/HomePage.css'

function App() {
  const { token, login, logout, userId, ready, admin } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  // if (!ready) {
  //   return <div>Loading</div>
  // }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, admin
    }}>
      <Router>
        <div className="app-container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;

