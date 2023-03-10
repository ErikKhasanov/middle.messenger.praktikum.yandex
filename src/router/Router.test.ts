import { Router } from 'core/Router';

describe('test Router', () => {
  let router = new Router();

  test('start router', () => {
    router.start();
    expect(Router.isStarted).toBeTruthy();
  });

  describe('add routes', () => {
    test('Should have router length 1', () => {
      router.use('test', () => {});
      const keysLength = Object.keys(router.routes).length;
      expect(keysLength).toBeGreaterThan(0);
    });

    test('Should have router object length 2', () => {
      router.use('test', () => {});
      router.use('main', () => {});
      const keysLength = Object.keys(router.routes).length;
      expect(keysLength).toBe(2);
    });
  });
});
