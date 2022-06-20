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
    countries AS ctr,
    currencies AS crr
SET
    crr.countryId = ctr.id,
    crr.name = '${obj.name}',
    crr.code = ${obj.code},
    crr.description = '${obj.description}',
    crr.countryID = ctr.id,
    crr.dateModified = NOW(),
    crr.userModified = 'SYSTEM'
WHERE
	crr.id=${obj.id} AND ctr.name='${obj.countryName}';`)
  },

  addCurrency(obj: any) {
    return (`INSERT INTO currencies(
      code,
      name,
      description,
      userCreated,
      dateCreated,
      countryId
  )
  SELECT
      ${obj.code},
      '${obj.name}',
      '${obj.description}',
      'SYSTEM',
      NOW(),
      ctr.id
  FROM
      countries as ctr
  WHERE
      ctr.name = '${obj.countryName}';`);
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
