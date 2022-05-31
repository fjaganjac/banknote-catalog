const users = {
  findAllUsers: `SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE valid = 1;`
};

const currencies = {
  findAllCurrencies: `SELECT
    currencies.id,
    currencies.code,
    currencies.description,
    currencies.country_id,
    countries.name
  FROM
    currencies
  INNER JOIN countries ON currencies.country_id = countries.id
  WHERE currencies.valid = 1;`
}
/* const currencies = {
  findAllCurrencies: `SELECT
    currencies.id,
    currencies.name,
    countries.name AS countryName,
    currencies.code,
    currencies.description,
    currencies.id AS kljuc
  FROM
    currencies
  INNER JOIN countries ON currencies.country_id = countries.id
  WHERE
    currencies.valid = 1;`
} */

const queries = Object.assign({}, { users, currencies} );

export default queries;