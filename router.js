class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }
    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    
        this.loadRoute(...pathSegs)
    }
    _matchUrlToRoute(urlSegs) {
        const matchedRoute = this.routes.find( route => {
            const routePathSegs = route.path.split('/').slice(1)
            if(routePathSegs.length !== urlSegs.length) {
                return false;
            }

            const lastRoute = routePathSegs.every( 
                (routePathSeg, i) => {
                    return routePathSeg === urlSegs[i];
                }
            );
            
            return lastRoute;
            }
        )
        return matchedRoute;
    }
    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs)
        const url = `${urlSegs.join('/')}`;

        try {
            history.pushState({}, 'This works', url)
        } catch (error) {
            console.error(error)            
        }

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }
}

