/* eslint-disable camelcase */
/* global fetch, sessionStorage */

import { jsonWebService } from '../../infrastructure/web-service';
import { URL_WS } from '../../constants';

export const updateVente = (items) => {
  const url = `${URL_WS}/update/vente/${items.id}`;
  const data = items;
  return new Promise((resolve, reject) => {
    jsonWebService.post(url, data)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => reject(err));
  });
};
export const Updatevente = (id, visite_id, prospect_id, produit_id, quantite, stock, date) => {
  const data = {
    id, visite_id, prospect_id, produit_id, quantite, stock, date,
  };

  return updateVente(data);
};
export const addVente = (items) => {
  const url = `${URL_WS}/add/vente`;
  const data = items;
  return new Promise((resolve, reject) => {
    jsonWebService.post(url, data)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => reject(err));
  });
};

export const serialize = (data) => {
  return data.map(occurrence => ({
    vente_id: occurrence.vente_id,
    visite_id: occurrence.visite_id || '',
    produit_id: occurrence.produit_id || '',
    prospect_id: occurrence.prospect_id || '',
    quantite: occurrence.quantite || '',
    stock: occurrence.stock || '',
    date: occurrence.date || '',
  }));
}

export const AddVente = (visite_id, prospect_id, produit_id, quantite, stock, date) => {
  const dt = {
    visite_id, prospect_id, produit_id, quantite, stock, date,
  };
  return addVente(dt);
};

