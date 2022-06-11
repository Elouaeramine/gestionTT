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
import { getCurrentUser } from '../../services/user/current-user'

class ContratsNoNTraites extends React.Component {

  state = {
    tableContrats: [],
    paginationNumber: 1,
    activePage: 1,
    showUsersTable: [],
    recordsPerPage: 4,
    
  }



  componentDidMount(){
    
    let owner = getCurrentUser().owner 
    
    let url = `${URL_WS}contrat/getnotreatedcontrats`
    jsonWebService.post(url,{owner}).then((response) => {
    
             this.setState({ tableContrats : response.ContratsWaitingtreatment});
             this.sliceTable(response.ContratsWaitingtreatment)
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
        const { activePage, showUsersTable, tableContrats, recordsPerPage } = this.state
        if(activePage !== 1){
          const offset = (activePage - 2) * recordsPerPage;
        
          this.setState({ 
            activePage : parseInt(activePage - 1),
            showUsersTable : tableContrats.slice(offset, offset + recordsPerPage )
          })
        }
        
      }    
    
  
  render(){
    
    const {
      paginationNumber,
      activePage,
      showUsersTable,} = this.state
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
                   <h5>Liste des Contrats Traites</h5>
                 </CCardHeader>
                 <CCardBody>
                   <CTable align="middle" className="mb-0 border" hover responsive>
                     <CTableHead color="light">
                       <CTableRow>
                         <CTableHeaderCell>Code</CTableHeaderCell>
                         <CTableHeaderCell >update_by</CTableHeaderCell>
                         <CTableHeaderCell>update_date</CTableHeaderCell>
                         <CTableHeaderCell>insert_date</CTableHeaderCell>
                       </CTableRow>
                     </CTableHead>
                     <CTableBody>
                         {showUsersTable.map((contrat , index) => (
                           <>
                           <CTableRow key = {index}>
                             <CTableDataCell>
                                 <CFormInput  type="text" id={contrat.id} value={contrat.code} placeholder={contrat.code} readOnly   plainText/> 
                             </CTableDataCell>
                             <CTableDataCell>
                             <CFormInput id={contrat.id} value={contrat.update_by} placeholder={contrat.update_by} readOnly  plainText/>                                
                             </CTableDataCell>
                             <CTableDataCell>
                             <CFormInput id={contrat.id} value={contrat.update_date} placeholder={contrat.update_date} readOnly  plainText/>                                
                             </CTableDataCell>
                             <CTableDataCell>
                             <CFormInput id={contrat.id} value={contrat.insert_date} placeholder={contrat.insert_date} readOnly  plainText/>                                
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

export default ContratsNoNTraites;