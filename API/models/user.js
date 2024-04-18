const bcrypt = require("bcrypt");
const con = require("../utils/db");
class Account {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async createUser() {
        //   try {
        //     const saltRounds = 10;
        //     const salt = await bcrypt.genSalt(saltRounds);
        //     const hashedPassword = await bcrypt.hash(this.password, salt);
        //     con.exc
        //   } catch (error) {
        //     console.error("Error creating user:", error);
        //   }
        // }
        Account.create = (newTutorial, result) => {
            sql.query(
                "INSERT INTO tutorials SET ?",
                newTutorial,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    result(null, { id: res.insertId, ...newTutorial });
                },
            );
        };
    }
}

model.exports = new Account();
