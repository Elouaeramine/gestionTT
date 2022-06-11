/* eslint-disable camelcase */
export class Ventes {
  date = '';
  id = '';
  produit_id = '';
  prospect_id = '';
  quantite = '';
  stock = '';


  constructor(item) {
    if (item) {
      this.date = item.date;
      this.id = item.id;
      this.produit_id = item.produit_id;
      this.prospect_id = item.prospect_id;
      this.quantite = item.quantite;
      this.stock = item.stock;
    }
  }
}
