/* eslint-disable no-unused-vars */
import { comparePath, getVariablesFromPath } from './utils';

export class PathRouter {
  constructor() {
    if (!PathRouter._instance) {
      PathRouter._instance = this;
    }
    return PathRouter._instance;
  }

  static routes: Record<string, Function> = {};
  static isStarted = false;

  static getInstance() {
    return this;
  }

  static start() {
    if (!this.isStarted) {
      this.isStarted = true;

      window.onpopstate = (event: PopStateEvent) => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  static onRouteChange(pathname: string = window.location.pathname) {
    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (comparePath(routeHash, pathname)) {
        const params = getVariablesFromPath(routeHash, pathname);
        callback(params);
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  static use(hash: string, callback: Function) {
    this.routes[hash] = callback;
    return this;
  }

  static go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  static back() {
    window.history.back();
  }

  static forward() {
    window.history.forward();
  }
}
