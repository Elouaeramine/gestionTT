/* eslint-disable camelcase */
export class Vente {
  vente_id = '';
  name = '';
  visite_id = '';
  prospect_id = '';
  produit_id = '';
  quantite = '';
  stock = '';
  date = '';


  constructor({
    vente_id, name, visite_id, prospect_id, produit_id, quantite, stock, date,
  }) {
    this.vente_id = vente_id;
    this.name = name;
    this.visite_id = visite_id;
    this.prospect_id = prospect_id;
    this.produit_id = produit_id;
    this.quantite = quantite;
    this.stock = stock;
    this.date = date;
  }
}
