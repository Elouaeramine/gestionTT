import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react';
import { useForm } from "react-hook-form";

const AddUser = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log('form' , data) ;
        // Todo : uncomment this in order to send it to the backend and change the enpoint
      
      /*  axios.post('/user', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          */
    }
    return(
        <>
              <CRow>
                <CCol xs>
                  <CCard className="mb-4">
                    <CCardHeader>Ajouter CDC</CCardHeader>
                    <CCardBody>
                    <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <CCol md={4}>
                            <CFormLabel htmlFor="inputMatricule">Matricule</CFormLabel>
                            <CFormInput required feedbackInvalid="Please type Matricule" type="text" id="inputMatricule" {...register("matricule")}/>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel htmlFor="inputNom">Nom</CFormLabel>
                            <CFormInput required feedbackValid="" type="text" id="inputNom" {...register("nom")}/>
                        </CCol>
                        <CCol xs={4}>
                            <CFormLabel htmlFor="inputPrenom">Prenom</CFormLabel>
                            <CFormInput required feedbackValid="" id="inputPrenom" {...register("prenom")} />
                        </CCol>
                        <CCol xs={4}>
                            <CFormLabel htmlFor="inputLogin">Login</CFormLabel>
                            <CFormInput required feedbackValid="" id="inputLogin" {...register("login")}/>
                        </CCol>
                        <CCol xs={4}>
                            <CFormLabel htmlFor="inputLoginBSCS">Login BSCS</CFormLabel>
                            <CFormInput required feedbackValid="" id="inputLoginBSCS" {...register("loginBSCS")}/>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel htmlFor="inputPassword">Password</CFormLabel>
                            <CFormInput required feedbackValid="" id="inputPassword" type='password' {...register("password")}/>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel htmlFor="inputProfil">Profil</CFormLabel>
                            <CFormSelect  required id="inputProfil"  {...register("profil")}>
                                <option>CDC</option>
                                <option>Team Leader</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel htmlFor="inputGroupe">Groupe</CFormLabel>
                            <CFormSelect id="inputGroupe" {...register("groupe")}>
                                <option>Controle</option>
                                <option>Suivi_V</option>
                                <option>CorrectionQ</option>
                                <option>Suivicontrol</option>
                                <option>Suivi_F</option>
                            </CFormSelect>
                        </CCol>
                        <CCol xs={12}>
                            <CButton color='dark' type="submit">Ajouter</CButton>
                        </CCol>
                    </CForm>
                    </CCardBody>
                </CCard>
                </CCol>
              </CRow>
        </>
    )
}

export default AddUser