/* eslint-disable camelcase */
import { URL_WS } from '../../constants';
import { jsonWebService } from '../../infrastructure/web-service';

export const addVisite = (items) => {
  const url = `${URL_WS}/add/visite`;
  const data = items;
  return new Promise((resolve, reject) => {
    jsonWebService.post(url, data)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Erreur de connexion !'));
        }
      })
      .catch(err => reject(err));
  });
};

export const AddVisite = (id, prospect_id, delegue_id, date, state, created_by) => {
  const data = {
    id, prospect_id, delegue_id, date, state, created_by,
  };
  return addVisite(data);
};
