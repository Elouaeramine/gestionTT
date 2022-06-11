/* eslint-disable camelcase */
/* global fetch, sessionStorage */

import { jsonWebService } from '../../infrastructure/web-service';
import { URL_WS } from '../../constants';
import { FAILURE, SUCCESS } from '../../infrastructure/web-service/statusTypes';
import * as eventsService from '../../infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from '../../infrastructure/sub-pub-events/eventTypes';

export const deleteVisit = (visite_id) => {
  const url = `${URL_WS}/remove/visite/${visite_id}`;
  return new Promise(() => {
    jsonWebService.post(url)
      .then(() => {
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: 'La visite est supprimée avec succès',
          variant: SUCCESS,
        });
      })
      .catch(() => {
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: 'Erreur de suppression',
          variant: FAILURE,
        });
      });
  });
};
export const DeleteVisit = (visite_id) => {
  return deleteVisit(visite_id);
};
