import { NOT_AUTHORIZED, SUCCESS } from './statusTypes';
import { LOGOUT_EVENT } from '../sub-pub-events/eventTypes';
import * as eventsService from '../sub-pub-events/eventsSystem';

export const headerGenerator = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});
export const deserialize = data => data.json();

export const post = (
  url,
  data,
  headers = headerGenerator(),
  castType = 'JSON',
) => new Promise((resolve, reject) => {
  fetch(url, {
    method: 'post',
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === NOT_AUTHORIZED) {
        eventsService.publish(LOGOUT_EVENT, {});
        throw new Error('Session expirée');
      }
      if (response.status === 500) {
        throw new Error('Erreur d\'envoi');
      }
      try {
        if (castType === 'JSON') {
          return response.json();
        }
      } catch (e) {
        return {};
      }
    })
    .then((response) => {
      if (castType === 'JSON') {
        const { status } = response;
        if (status === SUCCESS) {
          resolve(response);
        } else {
          reject(response);
        }
      }
      if (castType === 'BLOB') resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});

export const get = url => new Promise((resolve, reject) => {
  // noinspection JSAnnotator
  fetch(
    url,
    {
      method: 'get',
      headers: headerGenerator(),
      credentials: 'include',
    },
  )
    .then((res) => {
      try {
        return res.json();
      } catch (e) {
        return {};
      }
    })
    .then((response) => {
      if (response.status === NOT_AUTHORIZED) {
        eventsService.publish(LOGOUT_EVENT, {});
        throw new Error('Session expirée');
      }
      resolve(response);
    })
    .catch((err) => {
      if (err instanceof SyntaxError) {
        reject(new Error('server-error'));
      } else {
        reject(err);
      }
    });
});
