const isRequired = input => (input === '' ? 'Empty field is not Allowed' : true);

module.exports = { isRequired };