import React from 'react'
import { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CFormCheck,
  CButton,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
  import { useEffect } from 'react';
import tableExample from 'src/utils/users'
import withRouter from '../../wrapper/WithRouter'
import { jsonWebService } from 'src/infrastructure/web-service'
import {URL_WS} from '../../constants'

class InactifUsers extends React.Component {

  state = {
    APIData: [],
    resultArray: [],
    users: tableExample,
    checkedList: [],
    tableUsers: [],
    paginationNumber: 1,
    activePage: 1,
    showUsersTable: [],
    recordsPerPage: 4,
    newUsers :[]
  }



  componentDidMount(){
    const {tableUsers, activePage, recordsPerPage} = this.state
    let url = `${URL_WS}user/getallinactifusers`
    jsonWebService.get(url).then((response) => {
    
             this.setState({ tableUsers : response.users});
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
    
  handleDeleteFormSubmit = (e) => { 

    
   let { checkedList,tableUsers} = this.state
    
    e.preventDefault();
    let url 
    
    console.log(checkedList)
    checkedList.map((id, index) => (
    
      url = `${URL_WS}user/activateuser/${id}`,
    jsonWebService.post(url).then((response) => {
    
       url = `${URL_WS}user/getallinactifusers`
      jsonWebService.get(url).then((response) => {
      
        this.sliceTable(response.users)
        
     
          }).catch((err)=> {
       console.log('errrrr', err)
      })

        }).catch((err)=> {
     console.log('errrrr', err)
    })))
    
    this.setState({ checkedList:[]})     

  }
  handleEditCheckBox = (event , id ) => {

    let {resultArray,checkedList} = this.state 

    //if checked (true), then add this id into checkedList
    if (event.target.checked){
      resultArray = checkedList.filter((CheckedId) => {
        return CheckedId !== id
      })
      this.setState({
        resultArray:resultArray.push(id)
      })
      console.log(resultArray)
    }
    //if not checked (false), then remove this id from checkedList
    else{
      resultArray = this.state.checkedList.filter((CheckedId) => {
        return CheckedId !== id
      })
      console.log(resultArray)
    }

    //console.log('hello hello ' , resultArray);
    this.setState({checkedList:resultArray})
    console.log(resultArray)
    console.log(checkedList)
  
     
    
  }
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
    console.log(showUsersTable)
    
    if(showUsersTable.length > 0){
    return (
      <>
       <CRow>
           <CCol xs>
             <form onSubmit={e => this.handleDeleteFormSubmit(e)}>  
               <CCard className="mb-4">
                 <CCardHeader className="d-flex justify-content-between">
                   <h5>Utilisateurs inactifs</h5>
                 </CCardHeader>
                 <CCardBody>
                   <CTable align="middle" className="mb-0 border" hover responsive>
                     <CTableHead color="light">
                       <CTableRow>
                         <CTableHeaderCell>Nom</CTableHeaderCell>
                         <CTableHeaderCell >Prenom</CTableHeaderCell>
                         <CTableHeaderCell>Email</CTableHeaderCell>
                         <CTableHeaderCell>Choix</CTableHeaderCell>
                       </CTableRow>
                     </CTableHead>
                     <CTableBody>
                         {showUsersTable.map((user , index) => (
                           <>
                           <CTableRow key = {index}>
                             <CTableDataCell>
                                 <CFormInput  type="text" id={user.id} value={user.nom} placeholder={user.nom} readOnly   plainText/> 
                             </CTableDataCell>
                             <CTableDataCell>
                             <CFormInput id={user.id} value={user.prenom} placeholder={user.prenom} readOnly  plainText/>                                
                             </CTableDataCell>
                             <CTableDataCell>
                             <CFormInput id={user.id} value={user.email} placeholder={user.email} readOnly  plainText/>                                
                             </CTableDataCell>
                             <CTableDataCell className='text-medium-emphasis'>
                                 <CFormCheck onChange={e => this.handleEditCheckBox(e, user.id)}  id="flexCheckDefault" />
                             </CTableDataCell>
                         </CTableRow>
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
                   <CCard>
                     <CCardHeader>
                       <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                           <CButton color="dark" type='submit' className="me-md-2">
                               Activer 
                           </CButton>
                       </div>
                     </CCardHeader>
                   </CCard>
                 </CCard>
             </form>
           </CCol>
         </CRow>
       </>
     )
                         }
                         else{
                           return(
                            <>
                            </>
                           )
                           
                         }
  }
}

export default InactifUsers;