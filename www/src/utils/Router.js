export default class Router {
  constructor() {
    this.prevHash = '';
    this.routes = [];
    this.addWatcher();
  }

  addRouter(rule, func) {
    this.routes.push({rule, func});
  }

  hashChange() {
    let hash = location.hash;
    hash = this.formatHash(location.hash);
    if (this.prevHash === hash) {
      return;
    }
    this.prevHash = hash;
    // loop routers & fire
    this.routes.forEach(route => {
      if (hash.match(route.rule)) {
        route.func();
      }
    });
  }

  formatHash(hash) {
    hash = hash.slice(1) || '/';
    hash = hash.split('?')[0];
    return hash
  }

  addWatcher() {
    window.addEventListener('hashchange', () => {
      this.hashChange();
    });
  }
}
