const PLUGIN_DOMAIN = 'http://localhost:3000';
const PLUGIN_PATH = '/charts/extensions'
const PLUGIN_URL = PLUGIN_DOMAIN + PLUGIN_PATH;

/**
 * (MOCK) Get all the registered plugins in the system
 * @returns Promise<String[]>
 */
export function getAllPlugins() {
    return fetch(PLUGIN_URL + '/all')
        .then(response => response.json());
}


export function importPlugins() {
    const entryPoint = 'widget.js';
    
    return getAllPlugins().then((plugins: String[] = []) => {
        return Promise
        .all(
            plugins.map(plugin => import(`${PLUGIN_URL}/${plugin}/${entryPoint}`))
        )
        .then(modules => modules.map(module => module.default))
    });
}