/* eslint-disable no-unused-vars */
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

interface IRequest {
  url: string;
  method: METHOD;
  data?: any;
  isFile?: boolean;
}

type IMethod = (url: string, data?: IRequest['data'], isFile?: boolean, method?: METHOD) => Promise<XMLHttpRequest>;

class HTTPTransport {
  get: IMethod = url => {
    return this.request({ url, method: METHOD.GET });
  };

  post: IMethod = (url, data) => {
    return this.request({ url, method: METHOD.POST, data });
  };

  delete: IMethod = (url, data) => {
    return this.request({ url, method: METHOD.DELETE, data });
  };

  put: IMethod = (url, data, isFile = false) => {
    return this.request({ url, method: METHOD.PUT, data, isFile });
  };

  request({ url, method, data, isFile }: IRequest): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const reqData = typeof data !== 'undefined' ? data : null;
      xhr.open(method, `${BASE_URL}${url}`);

      xhr.withCredentials = true;

      if (reqData && !isFile) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !reqData) {
        xhr.send();
      } else {
        if (isFile) {
          xhr.send(reqData);
          return;
        }
        xhr.send(JSON.stringify(reqData));
      }
    });
  }
}

export default HTTPTransport;
