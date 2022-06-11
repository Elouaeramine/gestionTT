import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const addUser = React.lazy(()=> import('./views/gestionUser/addUser'))
const deleteUser = React.lazy(()=> import('./views/gestionUser/deleteUser'))
const inactifUsers = React.lazy(()=> import('./views/gestionUser/inactifUsers'))
const viewUsers = React.lazy(()=> import('./views/gestionUser/viewUsers'))
const mesContrats = React.lazy(()=> import('./views/gestionContrats/mesContrats'))
const contratsTraites = React.lazy(() => import('./views/gestionContrats/contratsTraites'))
const contratsNoNTraites = React.lazy(() => import('./views/gestionContrats/contratsNoNTraites'))
const Correspendances = React.lazy(()=> import('./views/gestionContrats/correspendances'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/gestion',exact : true, name: 'Gestion', element: addUser},
  { path: '/gestion/addUser', name: 'Ajouter Utilisateur', element: addUser},
  { path: '/gestion/deleteUser', name: 'Desactiver', element: deleteUser },
  { path: '/gestion/inactifUsers', name: 'Desactiver', element: inactifUsers },
  { path: '/gestion/viewUsers', name: 'Utilisateurs', element: viewUsers }, 
  { path: '/gestion/mesContrats', exact: true, name: 'Contrats', element: mesContrats },
  { path:'/gestion/contratsTraites', name:'contratsTraites', element:contratsTraites }, 
  {path:'/gestion/contratsNoNTraites', name:'contratsNoNTraites',element:contratsNoNTraites},
  { path: '/gestion/correspendances' , name : 'Correspendances ' , element : Correspendances}
]

export default routes
