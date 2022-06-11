import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, AppBreadcrumb } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100  bg-light">
          <AppBreadcrumb /> 
        <div className="body flex-grow-1 px-3 py-5">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
