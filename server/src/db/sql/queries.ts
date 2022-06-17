import AddCurrencyInteractor from "../../interactor/currencies/AddCurrencyInteractor";

const users = {
  findAllUsers: `SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE valid = 1;`
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
    dateModified = '${obj.dateModified}'
WHERE
    id=${obj.id}`)
  },

  addCurrency(obj: any) {
    return (`INSERT INTO currencies(
      id,
      code,
      name,
      description,
      dateCreated,
      userCreated
  )
  VALUES(
      '',
      ${obj.code},
      '${obj.name}',
      '${obj.description}',
      '${obj.dateCreated}',
      'SYSTEM'
  )`);
  },
  
  deleteCurrency(obj: any) {
    return(`UPDATE
    currencies
SET
    valid = 0,
    userModified = 'SYSTEM',
    dateModified = '${obj.dateModified}'
WHERE
    id=${obj.id}`)

  }
};


const queries = Object.assign({}, { users, currencies });

export default queries;
