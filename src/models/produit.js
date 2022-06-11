/* eslint-disable camelcase */
export class Produit {
  id = '';
  name = '';
  type = '';


  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.type = item.type;
  }
}
