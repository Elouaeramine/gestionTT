import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilLockLocked,
} from '@coreui/icons'
import { getLocalAuth } from 'src/services/auth'
import { Link } from 'react-router-dom'
import { getCurrentUser } from 'src/services/user/current-user'
import CalendarComponent from './calendar/Calendar'
import withRouter from '../../wrapper/WithRouter'
import { jsonWebService } from 'src/infrastructure/web-service'
import {URL_WS} from '../../constants'

class Dashboard extends React.Component {

state={
  nbContratTraite: 0,
  nbContratNonTraite:0,

}

 componentDidMount(){
  let url= `${URL_WS}contrat/gettreatedcontrats`
  jsonWebService.get(url)
  .then((response)=> {
    this.setState({nbContratTraite : response.count})
  }).catch((err)=> {
     console.log('errrrr', err)
    })
   url= `${URL_WS}contrat/getnotreatedcontrats`
  jsonWebService.get(url)
  .then((response)=> {
    this.setState({nbContratNonTraite : response.count})
  }).catch((err)=> {
     console.log('errrrr', err)
    })
}

  render(){
    const { nbContratTraite, nbContratNonTraite } = this.state

     let user = getCurrentUser()
    if(getLocalAuth()){
    return (
      <React.Fragment>
      <div style={{textAlign:'center', fontSize:'xx-large', marginBottom:'2%'}}>
        Bienvenue {user.prenom}              
      </div>
 
      <center>
      <div style={{display:'inline-flex'}}>
 
    
    <CCard
      textColor= 'primary'
      className={`mb-3 border-top-primary border-top-3`}
      style={{ width: '18rem', marginRight:'2%' }}
      
    >
      <CCardHeader> Contrats traités </CCardHeader>
      <CCardBody>
        <CCardTitle> Contrats traités </CCardTitle>
        <CCardText>
        Vous avez {nbContratTraite} contrats traités
        </CCardText>
      </CCardBody>
    </CCard>
    
    <CCard
      textColor= 'warning'
      className={`mb-3 border-top-warning border-top-3`}
      style={{ width: '18rem', marginRight:'2%' }}
      
    >
      <CCardHeader> Contrats non traités </CCardHeader>
      <CCardBody>
        <CCardTitle> Contrats non traités </CCardTitle>
        <CCardText>
        Vous avez {nbContratNonTraite} contrats dans votre fil d attente
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard
      textColor = 'success'
      className={`mb-3 border-top-success border-top-3`}
      style={{ width: '18rem', marginRight:'2%' }}
      
    >
      <CCardHeader> heures de connexion </CCardHeader>
      <CCardBody>
        <CCardTitle> heures de connexion </CCardTitle>
        <CCardText>
        Vous etes connectés depuis 5h 21m
        </CCardText>
      </CCardBody>
    </CCard>

  </div>
 <CalendarComponent />
  </center>
      </React.Fragment>
)
  }
  else{
    return(
      <React.Fragment />
      )
  } 

  }
  
}
export default withRouter(Dashboard)

