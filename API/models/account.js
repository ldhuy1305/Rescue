const sql = require("./db.js");
var bcrypt = require("bcryptjs");

class Account {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  
    async createUser() {
      try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log(1)
        // Assuming you have a 'users' table in your database
        // const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        // const values = [this.email, hashedPassword];
  
        // con.query(sql, values, (err, result) => {
        //   if (err) throw err;
        //   console.log("User created successfully:", result);
        // });
        
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  }
  
  module.exports = new Account();