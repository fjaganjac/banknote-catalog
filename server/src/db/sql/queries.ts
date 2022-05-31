const users = {
  findAllUsers: `SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE valid = 1;`
};

const currencies = {
  findAllCurrencies: `SELECT
    currencies.id,
    currencies.code,
    currencies.description,
    currencies.countryId,
    countries.name
  FROM
    currencies
  INNER JOIN countries ON currencies.countryId = countries.id
  WHERE currencies.valid = 1;`
}

const queries = Object.assign({}, { users, currencies} );

export default queries;