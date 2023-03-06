import { CoreRouter } from 'router/types';
import { comparePath, getVariablesFromPath } from 'router/utils';

export class Router implements CoreRouter {
  routes: Record<string, Function> = {};

  static isStarted = false;

  start() {
    if (!Router.isStarted) {
      Router.isStarted = true;

      window.onpopstate = () => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  use(routeName: string, callback: Function) {
    this.routes[routeName] = callback;
    return this;
  }

  forward() {
    window.history.forward();
  }

  back() {
    window.history.back();
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  onRouteChange(pathname: string = window.location.pathname) {
    const found = Object.entries(this.routes).find(([routeHash, callback]) => {
      if (comparePath(routeHash, pathname)) {
        const params = getVariablesFromPath(routeHash, pathname);
        callback(params);
        return true;
      }
      return false;
    });

    if (found) {
      const [, callback] = found;
      callback();
    }

    if (!found && this.routes['/messenger']) {
      this.routes['/messenger']();
    }
  }
}

const AppRouter = new Router();
export default AppRouter;
