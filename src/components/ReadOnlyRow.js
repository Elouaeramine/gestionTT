import { CButton , CTableRow , CTableDataCell , CFormInput , CFormCheck } from "@coreui/react";
import React from "react";
import CIcon  from '@coreui/icons-react'
import { cilPencil , cilTrash} from '@coreui/icons';

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <CTableRow>
        <CTableDataCell>
            <CFormInput  type="text"  value={user.nom} placeholder={user.nom} readOnly   plainText/> 
        </CTableDataCell>
        <CTableDataCell>
        <CFormInput value={user.prenom} placeholder={user.prenom} readOnly  plainText/>                                
        </CTableDataCell>
        <CTableDataCell>
        <CFormInput value={user.email} placeholder={user.email} readOnly  plainText/>                                
        </CTableDataCell>
      <CTableDataCell>
        <CButton
          className="m-2"
          color="light"
          type="button"
          onClick={(event) => handleEditClick(event, user)}
          >
          <CIcon icon={cilPencil}/>
        </CButton>
        <CButton color="danger" className="m-2" type="button" onClick={() => handleDeleteClick(user.id)}>
        <CIcon icon={cilTrash}/>
        </CButton>
      </CTableDataCell>
    </CTableRow>
  );
};

export default ReadOnlyRow;