/* global sessionStorage */
import { CURRENT_USER_KEY } from './index';
import { isTruthy } from '../../infrastructure/storage';
import { User } from '../../models/user';

export const getCurrentUser = () => {
  const rawUser = sessionStorage.getItem(CURRENT_USER_KEY);
  if (isTruthy(rawUser)) {
    return new User(JSON.parse(rawUser)); 
  }
  return false; 
}; 
export const setCurrentUser = (user) => { 
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const saveCurrentUser = (user) => {
  setCurrentUser(user); 
};