import HTTPTransport, { BASE_URL } from './';

function mockXMLHttpRequest(response?: Record<string, any>) {
  const xhrMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onload: jest.fn(),
    send: jest.fn(),
    response: response,
  };

  jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);

  return xhrMock;
}

describe('Test Http transport', () => {
  const http = new HTTPTransport();
  const url = '/test';

  test('Check get method', () => {
    const mock = mockXMLHttpRequest({ message: 'get request' });
    const response = http.get(url);

    expect(mock.open).toBeCalledWith('GET', `${BASE_URL}${url}`);

    expect(response).resolves.toEqual({ message: 'get request' });
  });

  test('Check post method', () => {
    const mock = mockXMLHttpRequest({ message: 'post request' });
    const response = http.post(url, { test: 'test' });

    expect(mock.open).toBeCalledWith('POST', `${BASE_URL}${url}`);

    expect(mock.send).toBeCalledWith(JSON.stringify({ test: 'test' }));

    expect(response).resolves.toEqual({ message: 'post request' });
  });

  test('Check put method', () => {
    const mock = mockXMLHttpRequest({ message: 'put request' });
    const response = http.put(url, { test: 'test' });

    expect(mock.open).toBeCalledWith('PUT', `${BASE_URL}${url}`);

    expect(mock.send).toBeCalledWith(JSON.stringify({ test: 'test' }));

    expect(response).resolves.toEqual({ message: 'put request' });
  });

  test('Check delete method', () => {
    const mock = mockXMLHttpRequest({ message: 'delete request' });
    const response = http.delete(url, { test: 'test' });

    expect(mock.open).toBeCalledWith('DELETE', `${BASE_URL}${url}`);

    expect(mock.send).toBeCalledWith(JSON.stringify({ test: 'test' }));

    expect(response).resolves.toEqual({ message: 'delete request' });
  });
});
