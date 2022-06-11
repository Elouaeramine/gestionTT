/* eslint-disable camelcase */
export class User {
  id = '';
  mail = '';
  role = '';
  authenticated: boolean;
  nom='';
  prenom='';
  owner='';

  constructor(item) {
    if (item) {
      this.id = item.id;
      this.mail = item.mail;
      this.role = item.role;
      this.authenticated = item.authenticated;
      this.nom = item.nom;
      this.prenom = item.prenom;
      this.owner = item.owner;
    }
  }
}
