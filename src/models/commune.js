/* eslint-disable camelcase */
export class Commune {
  id = '';
  label = '';
  code_postal_id = '';

  constructor(item) {
    this.id = item.id;
    this.label = item.label;
    this.code_postal_id = item.code_postal_id;
  }
}
