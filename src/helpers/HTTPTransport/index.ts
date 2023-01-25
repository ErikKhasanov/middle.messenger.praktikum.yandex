/* eslint-disable no-unused-vars */
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type IData = {
  [key: string]: any;
};

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

class HTTPTransport {
  get(url: string): Promise<XMLHttpRequest> {
    return this.request(url, METHOD.GET);
  }

  post(url: string, data?: IData): Promise<XMLHttpRequest> {
    return this.request(url, METHOD.POST, data);
  }

  delete(url: string, data: IData): Promise<XMLHttpRequest> {
    return this.request(url, METHOD.DELETE, data);
  }

  put(url: string, data: IData, isFile = false): Promise<XMLHttpRequest> {
    return this.request(url, METHOD.PUT, data, isFile);
  }

  request(url: string, method: METHOD, data?: IData, isFile: boolean): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}${url}`);

      xhr.withCredentials = true;

      if (data && !isFile) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        if (isFile) {
          xhr.send(data);
          return;
        }
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
