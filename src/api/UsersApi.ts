import HTTPTransport from 'helpers/HTTPTransport';

const http = new HTTPTransport();

export interface IChangeProfile {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

export interface IChangePassword {
  oldPassword: 'string';
  newPassword: 'string';
}

export type IChangeAvatar = any;

const UsersApi = {
  changeProfie: (data: IChangeProfile) => {
    return http.put('/user/profile', data);
  },
  changeAvatar: (data: IChangeAvatar) => {
    return http.put('/user/profile/avatar', data, true);
  },
  changePassword: (data: IChangePassword) => {
    return http.put('/user/password', data);
  },
};

export default UsersApi;
