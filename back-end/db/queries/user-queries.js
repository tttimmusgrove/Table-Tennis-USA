
const knexmain = require('../knexmain');

let create = (user) => {
  return knexmain.raw(
    `INSERT INTO user ( name, email, username, password )
    VALUES ( '${user.name}', '${user.email}', '${user.username}', '${user.password}' );`
  );
}

let login = (user) => {
  return knexmain.raw(
    `SELECT * from gen_user_auth1 WHERE login_id = '${user.email}';`
  );
}

module.exports = {
  create,
  login
}
