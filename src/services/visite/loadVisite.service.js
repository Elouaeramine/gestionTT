/* eslint-disable camelcase */
import { URL_WS, VISITS_WS } from '../../constants';
import { jsonWebService } from '../../infrastructure/web-service';

export const loadVisite = (items) => {
  const url = `${URL_WS}${VISITS_WS}?date=${items.date}`;
  return new Promise((resolve, reject) => {
    jsonWebService.get(url)
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

export const LoadVisite = (date) => {
  const data = {
    date,
  };
  return loadVisite(data);
};
