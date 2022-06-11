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
} from '@coreui/react'

import tableExample from 'src/utils/users'
const DeleteUser = () =>{

  
  const [users , setUsers] = useState(tableExample);
  const [checkedList , setCheckedList ] = useState([]);
  
  const handleDeleteFormSubmit = (e) => { 

    //  This function will be executed on clicking Desactiver Button 
   //   This function will return the ID of the user to deactivate
   //TODO : Change Console.log to http post request (appropriate route) 
    e.preventDefault();
    console.log(checkedList)
  }
  const handleEditCheckBox = (event , id ) =>{
    let resultArray = [];

    //if checked (true), then add this id into checkedList
    if (event.target.checked){
      resultArray = checkedList.filter(CheckedId => CheckedId !== id)
      resultArray.push(id)
    }
    //if not checked (false), then remove this id from checkedList
    else{
      resultArray = checkedList.filter(checkedId => checkedId !== id)
    }

    console.log('hello hello ' , resultArray);
    setCheckedList(resultArray)
  }
  return (
   <>
    <CRow>
        <CCol xs>
          <form onSubmit={handleDeleteFormSubmit}>  
            <CCard className="mb-4">
              <CCardHeader className="d-flex justify-content-between">
                <h5>Desactiver un  utilisateur</h5>
              </CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Nom</CTableHeaderCell>
                      <CTableHeaderCell >Prenom</CTableHeaderCell>
                      <CTableHeaderCell>Matricule</CTableHeaderCell>
                      <CTableHeaderCell>Choix</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {users.map((user , index) => (
                        <>
                        <CTableRow key={index}>
                          <CTableDataCell>
                              <CFormInput  type="text" id={user.id} value={user.nom} placeholder={user.nom} readOnly   plainText/> 
                          </CTableDataCell>
                          <CTableDataCell>
                          <CFormInput id={user.id} value={user.prenom} placeholder={user.prenom} readOnly  plainText/>                                
                          </CTableDataCell>
                          <CTableDataCell>
                          <CFormInput id={user.id} value={user.matricule} placeholder={user.matricule} readOnly  plainText/>                                
                          </CTableDataCell>
                          <CTableDataCell className='text-medium-emphasis'>
                              <CFormCheck onChange={(e) => handleEditCheckBox(e, user.id)}  id="flexCheckDefault" />
                          </CTableDataCell>
                      </CTableRow>
                        </>
                      ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
                <CCard>
                  <CCardHeader>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton color="dark" type='submit' className="me-md-2">
                            Désactiver 
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

export default DeleteUser;