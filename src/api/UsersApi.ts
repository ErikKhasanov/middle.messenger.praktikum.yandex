import HTTPTransport from 'helpers/HTTPTransport';

const http = new HTTPTransport();

interface IChangeProfile {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

interface IChangePassword {
  oldPassword: 'string';
  newPassword: 'string';
}

const UsersApi = {
  changeProfie: (data: IChangeProfile) => {
    return http.put('/user/profile', data);
  },
  changeAvatar: data => {
    return http.put('/user/profile/avatar', data, true);
  },
  changePassword: (data: IChangePassword) => {
    return http.put('/user/password', data);
  },
};

export default UsersApi;
