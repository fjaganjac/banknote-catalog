const users = {
  findAllUsers: `SELECT
  id,
  first_name AS firstName,
  last_name AS lastName,
  email
FROM
  users
WHERE
  valid = 1;`
};

const currencies = {
  findAllCurrencies: `SELECT
  crr.id,
  crr.name,
  crr.code,
  ctr.name as country
FROM
  currencies AS crr
INNER JOIN countries AS ctr ON crr.countryId = ctr.id
WHERE crr.valid = 1;`,

  editCurrency(obj: any) {
    return (`UPDATE
    currencies
SET
    code = ${obj.code},
    name = '${obj.name}',
    description = '${obj.description}',
    userModified = 'SYSTEM',
    dateModified = NOW()
WHERE
    id=${obj.id}`)
  },

  addCurrency(obj: any) {
    return (`INSERT INTO currencies(
      code,
      name,
      description,
      dateCreated,
      userCreated
  )
  VALUES(
      ${obj.code},
      '${obj.name}',
      '${obj.description}',
      NOW(),
      'SYSTEM'
  )`);
  },
  
  deleteCurrency(id: number) {
    return(`UPDATE
    currencies
SET
    valid = 0,
    userModified = 'SYSTEM',
    dateModified = NOW()
WHERE
    id=${id}`)

  }
};


const queries = Object.assign({}, { users, currencies });

export default queries;
