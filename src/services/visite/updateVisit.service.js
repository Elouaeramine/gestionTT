/* eslint-disable camelcase */
/* global fetch, sessionStorage */

import { jsonWebService } from '../../infrastructure/web-service';
import { URL_WS } from '../../constants';

export const updateVisit = (items) => {
  const url = `${URL_WS}/update/visite/${items.id}`;
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
export const UpdateVisit = (
  id,
  prospect_id,
  delegue_id,
  date,
  state,
) => {
  const data = {
    id,
    prospect_id,
    delegue_id,
    date,
    state,
  };
  return updateVisit(data);
};
