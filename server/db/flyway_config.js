var env = process.env;

module.exports = {
  url: `jdbc:mysql://${env.MYSQLHOST || "docker1.ping.ba"}:${
    env.MYSQLPORT || "3306"
  }/${env.MYSQLDATABASE || "banknote-catalog"}`,
  locations: "filesystem:db/sql/migrations",
  user: env.MYSQLUSER || "root",
  password: env.MYSQLPASSWORD || "root",
  sqlMigrationSuffix: ".sql"
};
