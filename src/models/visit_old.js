/* eslint-disable camelcase */
export class Visit_old {
  id = '';
  prospect_id = '';
  delegue_id = '';
  date = '';
  state = '';


  constructor(item) {
    if (item) {
      this.id = item.id;
      this.prospect_id = item.prospect_id;
      this.delegue_id = item.delegue_id;
      this.date = item.date;
      this.state = item.state;
    }
  }
}
