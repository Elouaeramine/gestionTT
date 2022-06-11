import { getCurrentUser } from './current-user';

export const getMail = () => getCurrentUser().mail;
export const getUserName = () => getCurrentUser().nom;
export const getRole = () => getCurrentUser().role;
