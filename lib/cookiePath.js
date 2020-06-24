const path = require('path');

const config_directory = path.join(process.env.HOME, '.cftool');
const cookiePath = path.join(config_directory, 'cookie.json');

module.exports = {cookiePath};