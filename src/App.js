import React, { Component, Suspense } from 'react'
import { Router, Route, Routes, BrowserRouter , IndexRoute, useNavigate } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const addUser = React.lazy(()=> import('./views/gestionUser/addUser'))
const Correspendances = React.lazy(()=> import('./views/gestionContrats/correspendances'))

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>

            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/correspendances" name="Correspendances " element={<Correspendances />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
