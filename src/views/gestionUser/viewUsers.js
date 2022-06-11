import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CRow,
  CTable,
  CFormInput,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import React, { useState , useEffect } from 'react';
import CIcon  from '@coreui/icons-react'
import { cilUserPlus} from '@coreui/icons';
import axios from 'axios'

import ReadOnlyRow from 'src/components/ReadOnlyRow';
import EditableRow from 'src/components/EditableRow';

/* These are static data just for test  
 Once We connect to the API we delete tableExample 
*/
import tableExample  from '../../utils/users'
import { getCurrentUser } from 'src/services/user/current-user';
import { URL_WS } from 'src/constants';
import { jsonWebService } from 'src/infrastructure/web-service';



class ViewUsers extends React.Component { 

state={
  tableUsers: [],
  paginationNumber: 1,
  activePage: 1,
  showUsersTable: [],
  recordsPerPage: 4,
  editFormData : {
    nom : "",
    prenom :"",
    email : "",
    password:""
  },
  addFormData: {
    nom :'' ,
    prenom :'',
    email : "",
    password: ""
 },
  editUserId: null,
  showAddForm: false,
}

componentDidMount(){
const {tableUsers, activePage, recordsPerPage} = this.state
let url = `${URL_WS}user/getallactifusers`
  jsonWebService.get(url).then((response) => {
    this.setState({ tableUsers : response.users})
    this.sliceTable(response.users)

      }).catch((err)=> {
   console.log('errrrr', err)
  })

}

sliceTable(tableWithAllData){
const {recordsPerPage, activePage} = this.state
if(tableWithAllData.length > 1) this.setState({ paginationNumber : ((tableWithAllData.length / recordsPerPage)) })

const offset = (activePage - 1) * recordsPerPage;
this.setState({ showUsersTable : tableWithAllData.slice(offset, offset + recordsPerPage )})
}

changeTablePage(e){
  const { activePage, showUsersTable, tableUsers, recordsPerPage } = this.state
  const offset = (e.target.text - 1) * recordsPerPage;
  
  this.setState({ 
    activePage : parseInt(e.target.text),
    showUsersTable : tableUsers.slice(offset, offset + recordsPerPage )
  })
}

nextTablePage(e){
  const { activePage, showUsersTable, tableUsers, recordsPerPage } = this.state
  if(activePage < tableUsers.length / recordsPerPage){
    const offset = (activePage) * recordsPerPage;
  
    this.setState({ 
      activePage : parseInt(activePage + 1),
      showUsersTable : tableUsers.slice(offset, offset + recordsPerPage )
    })
  }
  
}

prevTablePage(e){
  const { activePage, showUsersTable, tableUsers, recordsPerPage } = this.state
  if(activePage !== 1){
    const offset = (activePage - 2) * recordsPerPage;
  
    this.setState({ 
      activePage : parseInt(activePage - 1),
      showUsersTable : tableUsers.slice(offset, offset + recordsPerPage )
    })
  }
  
}

 handleEditClick (event , user ) {
  event.preventDefault();
  debugger
  const formValues =  {
    nom : user.nom ,
    prenom : user.prenom ,
    email : user.email
  }
  this.setState({
    editUserId : user.id,
    editFormData: formValues
  })
}

 handleEditFormChange (event) {
  event.preventDefault();
  const { editFormData } = this.state
  const fieldName = event.target.getAttribute('name'); 
  const fieldValue = event.target.value;

  const newFormData = { ...editFormData };
  newFormData[fieldName] = fieldValue;
  this.setState({ editFormData : newFormData })
}

 handleEditFormSubmit (e){
  e.preventDefault();
  debugger
  const { editUserId, editFormData, tableUsers } = this.state
  console.log(editUserId)
  let url= `${URL_WS}user/updateuser/${editUserId}`
  jsonWebService.post(url, {
    nom : editFormData.nom ,
    prenom : editFormData.prenom,
    email : editFormData.email
  }).then((response) => {
    let url= `${URL_WS}user/getallactifusers`
  jsonWebService.get(url).then((response) => {
    const editedUser = {
      nom : editFormData.nom ,
      prenom : editFormData.prenom,
      email : editFormData.email,
      inactive : editFormData.inactive,
      id: editUserId
    }
    const newUsers = tableUsers;
    debugger
    const index = tableUsers.findIndex((user)=> user.id === editUserId );
    newUsers[index] = editedUser;
    this.setState({
      tableUsers : newUsers,
      editUserId : null,
      tableUsers : response.users
    })
    this.sliceTable(newUsers)
      }).catch((err)=> {
   console.log('errrrr', err)
  })
      }).catch((err)=> {
   console.log('errrrr', err)
  })
}

 handleCancelClick () {
   this.setState({ editUserId : null})
}

 handleDeleteClick (contactId) {
   const { tableUsers } = this.state
  const newUsers = [...tableUsers];

  const index = tableUsers.findIndex((contact) => contact.id === contactId);

  newUsers.splice(index, 1);

  let url= `${URL_WS}user/deleteusers/${contactId}`
  jsonWebService.post(url).then((response) => { 
    let url= `${URL_WS}user/getallactifusers`
  jsonWebService.get(url).then((response) => {
          this.setState({ tableUsers : response.users})
      }).catch((err)=> {
   console.log('errrrr', err)
  })
      }).catch((err)=> {
   console.log('errrrr', err)
  })
  this.setState({ tableUsers : newUsers })
  this.sliceTable(newUsers)
}

ShowAddForm(){
  const { showAddForm }= this.state
  this.setState({ showAddForm : !showAddForm })
}

 handleAddFormChange (event) {
  event.preventDefault();
  const { addFormData } = this.state
  const fieldName = event.target.getAttribute('name'); 
  const fieldValue = event.target.value;

  const newFormData = { ...addFormData };
  newFormData[fieldName] = fieldValue;
  this.setState({ addFormData : newFormData })
}

 handleAddFormSubmit (event) {
  event.preventDefault();
  const { addFormData } = this.state
 /* const newUser = {
    id: nanoid(),
    nom: addFormData.nom,
    prenom: addFormData.prenom,
    email: addFormData.email,
    password:addFormData.password,
    status : addFormData.status
  };*/

 // console.log(newUser)
  let url= `${URL_WS}user/createuser`
  jsonWebService.post(url, {
    nom: addFormData.nom,
    prenom: addFormData.prenom,
    email: addFormData.email,
    password:addFormData.password,
    role : "agent",
    typecontrat:"postpayer"
  }).then((response) => {
        let url = `${URL_WS}user/getallactifusers`
  jsonWebService.get(url).then((response) => {
    this.setState({ tableUsers : response.users, showAddForm : false})
    this.sliceTable(response.users)

      }).catch((err)=> {
   console.log('errrrr', err)
  })
      }).catch((err)=> {
   console.log('errrrr', err)
  })
  
};

render(){
  const {tableUsers,
    paginationNumber,
    activePage,
    showUsersTable,
    recordsPerPage,
    editFormData,
    editUserId,
    showAddForm } = this.state
  
  const paginations = []

 for(let i = 0; i< paginationNumber; i++){
  paginations.push(<CPaginationItem style={{backgroundColor: activePage === (i+1) ? '#d8dbe0' : '#fff'}} onClick={e => this.changeTablePage(e)}>{i + 1 }</CPaginationItem>)
}
if(showUsersTable.length > 0){
  return (
    <>
          <CRow>
            <CCol xs>
              <form onSubmit={e => this.handleEditFormSubmit(e)}>  
                <CCard className="mb-4">
                  <CCardHeader className="d-flex justify-content-between">
                    <h5>Liste Utilisateurs</h5>
                    <CButton color='dark' onClick={()=> this.ShowAddForm()}><CIcon icon={cilUserPlus}/></CButton>
                  </CCardHeader>
                  
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell>Nom</CTableHeaderCell>
                          <CTableHeaderCell >Prenom</CTableHeaderCell>
                          <CTableHeaderCell>Email</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody >
                      {showUsersTable.map((user, key) => (
                              <>
                              {editUserId === user.id ?
                               <EditableRow 
                                editFormData={editFormData} 
                                handleEditFormChange={e => this.handleEditFormChange(e)}
                                handleCancelClick= {e => this.handleCancelClick()}
                              />
                                :
                                <ReadOnlyRow 
                                  user={user}  
                                  handleDeleteClick={e => this.handleDeleteClick(user.id)}
                                  handleEditClick={e => this.handleEditClick(e, user)}
                                /> 
                              }
                              </>
                            ))}
                      </CTableBody>
                    </CTable>
                    <CPagination aria-label="Page navigation example">
<CPaginationItem onClick={e => this.prevTablePage(e)}>Previous</CPaginationItem>
{/* {tableUsers.map((user, index) => (
<>
<CPaginationItem>{index + 1 }</CPaginationItem>
</>
))} */}
{paginations}


<CPaginationItem onClick={e => this.nextTablePage(e)}>Next</CPaginationItem>
</CPagination>
                  </CCardBody>
                      {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="primary"type='submit' className="me-md-2">
                              Désactiver 
                          </CButton>
                      </div> */}
                  </CCard>
              </form>
            </CCol>
          </CRow>
          {showAddForm && <CRow>
            <CCol>
                <h4>Ajouter un utilisateur</h4>
                <CForm onSubmit={e => this.handleAddFormSubmit(e)}>
                <CTableRow className='d-flex justify-content-even'>
                  <CTableDataCell>
                    <CFormInput type='text' required name='nom' placeholder='entrer nom' onChange={e => this.handleAddFormChange(e)}/>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput type='text' required name='prenom' placeholder='entrer prenom' onChange={e => this.handleAddFormChange(e)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput type='text' required name='email' placeholder='entrer email' onChange={e => this.handleAddFormChange(e)} />
                  </CTableDataCell>
                  <CTableDataCell>
                      <CFormInput type='password' required name='password' placeholder='entrer password' onChange={e => this.handleAddFormChange(e)}/>
                    </CTableDataCell>
                  <CTableDataCell>
                    {/* <CFormInput type='checkbox' name='inactive' onChange={handleAddFormChange} /> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color='dark'  type='submit'><CIcon icon={cilUserPlus}/></CButton>
                  </CTableDataCell>
                </CTableRow>
                </CForm>
            </CCol>
          </CRow>}
        </>
        );  
      }
      else {
        return(
          <>
          <h1>vide</h1>
          </>
        )
      }
}
}

export default ViewUsers; 