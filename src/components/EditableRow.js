import {  CButton , CTableRow , CTableDataCell , CFormInput, CFormCheck  } from "@coreui/react";
import React from "react";
import CIcon  from '@coreui/icons-react'
import { cilSave, cilActionUndo} from '@coreui/icons';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <CTableRow>
      <CTableDataCell>
        <CFormInput
          type="text"
          name="nom"
          value={editFormData.nom}
          defaultValue='a'
          onChange={handleEditFormChange}
        />
      </CTableDataCell>
      <CTableDataCell>
        <CFormInput
          type="text"
          name="prenom"
          value={editFormData.prenom}
          defaultValue='a'
          onChange={handleEditFormChange}
        />
      </CTableDataCell>
      <CTableDataCell>
        <CFormInput
          type="text"
          name="email"
          value={editFormData.email}
          defaultValue='a'
          onChange={handleEditFormChange}
        />
      </CTableDataCell>
      <CTableDataCell>
        <CButton className="m-2" type="submit" color="light">
            <CIcon icon={cilSave}/>
        </CButton>
        <CButton className="m-2" color="dark" type="button" onClick={handleCancelClick}>
            <CIcon icon={cilActionUndo}/>
        </CButton>
      </CTableDataCell>
    </CTableRow>
  );
};

export default EditableRow;