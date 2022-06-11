import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeaderToggler,
  CHeader,
  CHeaderBrand
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilAccountLogout } from '@coreui/icons'
import { logo } from 'src/assets/brand/logo'
import { logout } from 'src/services/auth'
import { setLoggedIn } from 'src/contexts/AuthContext'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const logout =(e) =>{
    setLoggedIn(false)
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <>
    <CHeader position="sticky">
        <CHeaderToggler
              className="ps-1"
              onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            >
              <CIcon icon={cilMenu} color='dark' size="lg" />
        </CHeaderToggler> 
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CBreadcrumb className="m-0 ms-2">
          <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <CBreadcrumbItem
                {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                key={index}
              >
                {breadcrumb.name}
              </CBreadcrumbItem>
            )
          })}
        </CBreadcrumb>
        <Link to="/login"> 
        <CHeaderToggler className="m-0 ms-2" onClick={e => logout(e)}>
          <CIcon icon={cilAccountLogout} height={30} alt="logout"/>
        </CHeaderToggler>
        </Link>
    </CHeader>
    </>
  )
}

export default React.memo(AppBreadcrumb)
