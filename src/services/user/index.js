import { getDelegueId, getUserName, getRole } from './user-identity';
import { saveCurrentUser } from './current-user';

export const CURRENT_USER_KEY = 'current-user';
export const USER_INFORMATIONS = 'user-informations';


export const userServices = {
  getUserName: () => getUserName(),
  getRole: () => getRole(),

  saveCurrentUser: () => saveCurrentUser(),
};
