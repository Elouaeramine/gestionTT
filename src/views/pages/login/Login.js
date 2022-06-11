import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { createBrowserHistory   } from 'history'
import withRouter from '../../../wrapper/WithRouter'
import { jsonWebService } from 'src/infrastructure/web-service'
import { setLoggedIn } from 'src/contexts/AuthContext'
import { saveCurrentUser } from 'src/services/user/current-user'
import { login } from '../../../services/auth'
import Confetti from 'react-confetti'
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes'

class Login extends React.Component{
  state = {
    email: '',
    password: '', 
  }

  onChangeLogin(e){
    this.setState({email : e.target.value})
  }

  onChangePassword(e){
    this.setState({password : e.target.value})
  }

  loginUser(){
    const {email , password } = this.state
    const {router} = this.props
    debugger
    // jsonWebService.get('./data/dataAdmin.json')
    // .then((response)=> {
    //   setLoggedIn(true)
    //   saveCurrentUser(response.data)
    //   router.navigate("/dashboard")
    // })
    // .catch((err)=> {
    //   console.log('errrrr', err)
    // })
    login({ email, password })
      .then((data) => {
        setLoggedIn(true);
        saveCurrentUser(data.data);
        router.navigate("/dashboard")
      })
      .catch((data) => {
        debugger
        setLoggedIn(false);
      });
  }

  render(){
    const { email, password } = this.state
    
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="email" autoComplete="username" value={email} onChange={e => this.onChangeLogin(e)} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={e => this.onChangePassword(e)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          {/* <Link  to="/dashboard"> */}
                            <CButton  color="primary" className="px-4" onClick={e => this.loginUser()}>
                              Login
                            </CButton>
                          {/* </Link> */}
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" >
                
                  <CCardBody className="text-center">
                  {/* <Confetti
                  width='400px'
                  height='350px'
                    /> */}
                    <h2>Direction Relation Clientèle</h2>
                    <img class="fit-picture"
     src="/images/tt.png" width= '100%'/>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}


  export default withRouter(Login)
