const env = import.meta.env;
const ENV_LOCATIONS = [
    {
        env_prefix: 'NUXT_APP_PRODUCTION',
        locations: ['eterex.com'],
    },
    {
        env_prefix: 'NUXT_APP_DEVELOPMENT',
        locations: ['localhost:3000', 'stage.eterex.net'],
    },
];
let ENV_VALUES = {};


function setEnvValues() {
   
    console.log({env});
    const appUrl = window.location.host ?? 'localhost:3000';
    const app = ENV_LOCATIONS.find(i => i.locations.includes(appUrl))

    Object.entries(env).map((key) => {
        let envKey = key[0];
        const envValue = key[1];
        if (envKey.includes(app.env_prefix)) {
            ENV_VALUES[envKey.replace(app.env_prefix + '_', '')] = envValue
        }
    });
}


setEnvValues();

export default {
    isDevelopment:ENV_VALUES['MODE'] === 'development',
    isProduction:ENV_VALUES['MODE'] === 'production',
    blogBaseApiUrl: ENV_VALUES['BLOG_BASE_URL'],
    apiBaseUrl: ENV_VALUES['API_BASE_URL'],
    staticSrcUrl: ENV_VALUES['STATIC_SRC'],
    panelUrl: ENV_VALUES['PANEL_URL'],
};


