/* eslint-disable camelcase */
export class Prospect {
  birck_ims_80 = '';
  code_postal = '';
  code_uga = '';
  id = '';
  label_commune = '';
  prospect_adresse = '';
  prospect_commune_id = '';
  prospect_exercice = '';
  prospect_label = '';
  prospect_reseau = '';
  prospect_specialite = '';

  constructor(item) {
    if (item) {
      this.birck_ims_80 = item.birck_ims_80;
      this.code_postal = item.code_postal;
      this.code_uga = item.code_uga;
      this.id = item.id;
      this.label_commune = item.label_commune;
      this.prospect_adresse = item.prospect_adresse;
      this.prospect_commune_id = item.prospect_commune_id;
      this.prospect_exercice = item.prospect_exercice;
      this.prospect_label = item.prospect_label;
      this.prospect_reseau = item.prospect_reseau;
      this.prospect_specialite = item.prospect_specialite;
    }
  }
}
