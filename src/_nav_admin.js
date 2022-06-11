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

const _nav_admin = [
  {
    component: CNavItem,
    name: 'Acceuil',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,

  },
  {
    component: CNavGroup,
    name: 'Gestion Utilisateur',
    to: '/gestion/viewUsers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Utilisateurs actifs',
        to: '/gestion/viewUsers',
      },
      {
        component: CNavItem,
        name: 'Utilisateurs inactifs',
        to: '/gestion/inactifUsers',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion des contrats',
    to: '/dashboard',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mes contrats',
        to: '/gestion/mesContrats',
      },
      {
        component: CNavItem,
        name: 'Contrats traités',
        to: '/gestion/contratsTraites',
      },
      {
        component: CNavItem,
        name: 'Contrats non traités',
        to: '/gestion/contratsNoNTraites',
      },
      {
        component: CNavItem,
        name: 'Tous les contrats',
        to: '/gestion/contratsTraites',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Suivi des agents',
    to: '/dashboard',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,

  },
  
  {
    component: CNavItem,
    name: 'Statistiques',
    to: '/dashboard',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,

  },
  
]

export default _nav_admin
