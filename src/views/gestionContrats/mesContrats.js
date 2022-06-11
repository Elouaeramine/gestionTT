import React from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import tableExample from 'src/utils/users'
import { jsonWebService } from 'src/infrastructure/web-service'
import {URL_WS} from '../../constants'
import { getCurrentUser } from '../../services/user/current-user'

class MesContrats extends React.Component {

  
  state = {
    tableUsers : tableExample,
    checkedList : [],
    visible : false,
    paginationNumber: 1,
    activePage: 1,
    showUsersTable: [],
    recordsPerPage: 3,
  }

  componentDidMount(){
    const {tableUsers} = this.state
    let owner = getCurrentUser().owner
    let url = `${URL_WS}contrat`
    jsonWebService.post(url,{owner}).then((response) => {
    
             this.setState({ tableUsers : response.contrats});
             this.sliceTable(response.contrats)
             
        }).catch((err)=> {
     console.log('errrrr', err)
    })


    // 7801
    }
   
  sliceTable(tableWithAllData){
    const {recordsPerPage, activePage} = this.state
    console.log(tableWithAllData)
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



  handleDeleteFormSubmit(e){ 

    //  This function will be executed on clicking Desactiver Button 
   //   This function will return the ID of the user to deactivate
   //TODO : Change Console.log to http post request (appropriate route) 
   const {checkedList} = this.state;
    e.preventDefault();
    console.log(checkedList)
  }

  handleEditCheckBox(event , id ){
    const {resultArray} = this.state

    //if checked (true), then add this id into checkedList
    if (event.target.checked){
      resultArray = this.state.checkedList.filter((CheckedId) => {
        return CheckedId !== id
      })
      this.setState({
        resultArray : resultArray.push(id)
      })
    }
    //if not checked (false), then remove this id from checkedList
    else{ 
      resultArray = this.state.checkedList.filter((CheckedId) => {
        return CheckedId !== id
      })
    }

    console.log('hello hello ' , resultArray);
    this.setState({
      checkedList:resultArray
    })
  }

  handleAssign(e){
    debugger
  }
render(){


  
    const {
      tableUsers,
      visible,
      paginationNumber,
      activePage,
      showUsersTable} = this.state
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
                 <h5>Mes contrats</h5>
               </CCardHeader>
               <CCardBody>
                 <CTable align="middle" className="mb-0 border" hover responsive>
                   <CTableHead color="light">
                     <CTableRow>
                       <CTableHeaderCell>Id</CTableHeaderCell>
                       <CTableHeaderCell >date</CTableHeaderCell>
                       <CTableHeaderCell>Choix</CTableHeaderCell>
                     </CTableRow>
                   </CTableHead>
                   <CTableBody>
                       {showUsersTable.map((contrat , index) => (
                         <>
                         <CTableRow key={index}>
                           <CTableDataCell>
                               <CFormInput  type="text" id={contrat.id} value={contrat.id} placeholder={contrat.id} readOnly   plainText/> 
                           </CTableDataCell>
                           <CTableDataCell>
                           <CFormInput id={contrat.id} value={contrat.code} placeholder={contrat.code} readOnly  plainText/>                                
                           </CTableDataCell>
                           <CTableDataCell className='text-medium-emphasis'>
                               <CFormCheck onChange={(e) => this.handleEditCheckBox(e, contrat.id)}  id="flexCheckDefault" />
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
                         <CButton color="dark" className="me-md-2" onClick={() => this.setState({visible:!visible})}>
                             Affecter 
                         </CButton>
                     </div>
                   </CCardHeader>
                 </CCard>
               </CCard>
           </form>
         </CCol>
       </CRow>
       <CModal visible={visible} onClose={() => this.setState({visible:false})}>
       <CModalHeader onClose={() => this.setState({visible:false})}>
         <CModalTitle>Modal title</CModalTitle>
       </CModalHeader>
       <CModalBody>
       <CFormSelect size="sm" className="mb-3" aria-label="Small select example" onChange={(e) => this.handleAssign(e)}>
             <option>Open this select menu</option>
             <option value="1">Hamdi Jaouadi</option>
             <option value="2">Zouhour Sbai</option>
             <option value="3">Dhouha Hajji</option>
       </CFormSelect>
       </CModalBody>
       <CModalFooter>
         <CButton color="secondary" onClick={() => this.setState({visible:false})}>
           fermer
         </CButton>
         <CButton color="primary">Affecter</CButton>
       </CModalFooter>
     </CModal>
     </>
   )
}else{
  return(
   <>
   <h1>empty</h1>
   </>
  )
  
}
}
}

export default MesContrats;