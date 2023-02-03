import HTTPTransport from 'helpers/HTTPTransport';

const http = new HTTPTransport();

export interface ISigninData {
  login: String;
  password: String;
}

export interface ISignupData {
  first_name: String;
  second_name: String;
  login: String;
  email: String;
  password: String;
  phone: String;
}

const UserApi = {
  signin: (data: ISigninData) => {
    return http.post('/auth/signin', data);
  },
  signup: (data: ISignupData) => {
    return http.post('/auth/signup', data);
  },
  getUser: () => {
    return http.get('/auth/user');
  },
  logout: () => {
    return http.post('/auth/logout', {});
  },
};

export default UserApi;
