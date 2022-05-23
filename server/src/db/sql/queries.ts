const users = {
  findAllUsers: `SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE valid = 1;`
};

const queries = Object.assign({}, { users });

export default queries;
