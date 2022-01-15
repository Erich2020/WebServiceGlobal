const myslq = require("mysql");

class MySQLClient {
  // MYSQL
  // Params Connection
  connection = myslq.createConnection({
    host: "172.17.0.2",
    port: 3306,
    user: "root",
    password: "password",
    database: "persona",
  });
  // Test of Connection
  Conect = () => {
    this.connection.connect((error) => {
      if (error) throw error;
      console.log("Connection is Success");
    });
    return true;
  };

  async Select(table, f = ()=>{}) {
    var sql = `SELECT * FROM ${table}`;
     return this.connection.query(sql, f);
  }
  SelectBy(table, params, value, f = ()=>{}) {
    var sql = "SELECT * FROM ?? WHERE ?? like ?";
    var inserts = [table, params, '%'+value+'%'];
    sql = myslq.format(sql, inserts);
    this.connection.query(sql, f);
  }

  Update(table, value, json, f = ()=>{}) {
    var sql = `UPDATE ${table} SET ? WHERE id = ${value}`;
    sql = myslq.format(sql, json);
    console.log(sql);
    this.connection.query(sql, f);
  }

  Insert = (table, json, f= ()=>{}) => {
    var sql = `INSERT INTO ${table} SET ? `;
    sql = myslq.format(sql, json);
    this.connection.query(sql, f
    );
  };

  Delete(table, value, f=()=>{}) {
    var sql = `Delete FROM ${table} WHERE ?? = ${value}`;
    var inserts = [ 'id'];
    sql = myslq.format(sql, inserts);
    this.connection.query(sql, f);
  }
}

module.exports = MySQLClient;
