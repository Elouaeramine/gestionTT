/* eslint-disable camelcase */
export class Visite {
  id: ''
  birck_ims_80: '';
  code_postal: "";
  code_uga: "";
  date_visite: "";
  delegue_id: "";
  id_visite: "";
  label_commune: "";
  prospect_adresse: "";
  prospect_commune_id: "";
  prospect_exercice: "";
  prospect_id: "";
  prospect_label: "";
  prospect_reseau: "";
  prospect_specialite: "";
  state: "";
  created_by: '';

  constructor(item) {
    if (item) {
      this.id = item.id;
      this.birck_ims_80 = item.birck_ims_80;
      this.code_postal = item.code_postal;
      this.code_uga = item.code_uga;
      this.date_visite = item.date_visite;
      this.delegue_id = item.delegue_id;
      this.id_visite = item.id_visite;
      this.label_commune = item.label_commune;
      this.prospect_adresse = item.prospect_adresse;
      this.prospect_commune_id = item.prospect_commune_id;
      this.prospect_exercice = item.prospect_exercice;
      this.prospect_id = item.prospect_id;
      this.prospect_label = item.prospect_label;
      this.prospect_reseau = item.prospect_reseau;
      this.prospect_specialite = item.prospect_specialite;
      this.state = item.state;
      this.created_by = item.created_by;
    }
  }
}
