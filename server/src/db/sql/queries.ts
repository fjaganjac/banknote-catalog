const users = {
  findAllUsers: `SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE valid = 1;`
};

const currencies = {
  findAllCurrencies: `SELECT
  crr.id,
  crr.name,
  crr.code,
  ctr.name as countryName,
  crr.id as "key"
FROM
  currencies AS crr
INNER JOIN countries AS ctr ON crr.countryId = ctr.id
WHERE crr.valid = 1;`,
}


const queries = Object.assign({}, { users, currencies} );

export default queries;