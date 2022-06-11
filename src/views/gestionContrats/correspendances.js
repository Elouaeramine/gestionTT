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



const Correspendances = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log('form' , data) ;
    }
    return(
        <>
              <CRow>
                <CCol xs>
                  <CCard className="mb-4">
                    <CCardHeader>Interface des Correspendances</CCardHeader>
                    <CCardBody>
                    <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <CCol md={12}>
                            <CFormLabel htmlFor="inputDateDepot">Date de Depot</CFormLabel>
                            <CFormInput required  type="date" id="inputDateDepot" {...register("depot")}/>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel htmlFor="inputDateTriPostal">Date de Tri Postal</CFormLabel>
                            <CFormInput required  type="date" id="inputDateTriPostal" {...register("triPostal")}/>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel htmlFor="inputDateDistribution">Date de Distribution</CFormLabel>
                            <CFormInput required  type="date" id="inputDateDistribution" {...register("distribution")}/>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel htmlFor="inputDateRetour">Date de Retour</CFormLabel>
                            <CFormInput required  type="date" id="inputDateRetour" {...register("retour")}/>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputMotif">Motif</CFormLabel>
                            <CFormSelect required id="inputMotif"  {...register("motif")}>
                                <option>Adresse Insuffisante</option>
                                <option>NPAI</option>
                                <option>Autre</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputAutreMotif">Autre Motif</CFormLabel>
                            <CFormInput  type="text" id="inputAutreMotif" {...register("autreMotif")}/>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel htmlFor="inputTypeCorrespendance">Type de Correspendance</CFormLabel>
                            <CFormSelect required id="inputTypeCorrespendance"  {...register("typeCorrespendance")}>
                                <option>Facture</option>
                                <option>Lettre d'excuse</option>
                                <option>Lettre d'information</option>
                                <option>Mise en demande </option>
                                <option>Relance</option>
                                <option>Sans identité</option>
                                <option>TT</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputIDClient">ID Client</CFormLabel>
                            <CFormInput  type="number" id="inputIDClient" {...register("idClient")}/>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputJoignabilite">Joignabilité</CFormLabel>
                            <CFormSelect required id="inputJoignabilite"  {...register("joignabilite")}>
                                <option>Actif</option>
                                <option>Faux Contrat / Fax</option>
                                <option>Grand Compte / Entreprise</option>
                                <option>HS</option>
                                <option>Inexistant dans BSCS</option>
                                <option>Ligne 3G ++</option>
                                <option>NPR</option>
                                <option>Refus de Commande</option>
                                <option>TT</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputResultat">Résultat Contrat</CFormLabel>
                            <CFormSelect required id="inputResultat"  {...register("resultat")}>
                                <option>Adresse Correcte</option>
                                <option>Adresse Modifiée</option>
                                <option>Diriger vers ACTEL</option>
                                <option>Localité Modifiée</option>
                                <option>Recontacter</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputMessage">Message</CFormLabel>
                            <CFormInput  type="text" id="inputMessage" {...register("message")}/>
                        </CCol>
                        <CCol xs={12}>
                            <CButton color='dark' type="submit">Enregistrer</CButton>
                        </CCol>
                    </CForm>
                    </CCardBody>
                </CCard>
                </CCol>
              </CRow>
        </>
    )
}

export default Correspendances