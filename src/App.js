import {Route, Switch, Redirect, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from './components/Header'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import Login from './components/Login'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const location = useLocation()
  const isAuthenticated = () => !!Cookies.get('jwt_token')

  return (
    <div className="app-container">
      {/* Only render Header if not on the Login route */}
      {location.pathname !== '/login' && <Header />}

      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated() ? <Home /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/login"
          render={() => (isAuthenticated() ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          exact
          path="/jobs"
          render={() =>
            isAuthenticated() ? <Jobs /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/jobs/:id"
          render={props =>
            isAuthenticated() ? (
              <JobItemDetails {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  )
}

export default App
