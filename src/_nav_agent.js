import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilAppsSettings,
  cilChartPie,
  cilFolderOpen,
  cilGraph,
  cilSpeedometer,
  cilUser,
  cilHome,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav_agent = [
  {
    component: CNavItem,
    name: 'Acceuil',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Gestion des rapport',
    to: '/dashboard',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,

  },
  
]

export default _nav_agent
