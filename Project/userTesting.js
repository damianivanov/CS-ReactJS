const {User} = require('./user');
const bcrypt = require('bcrypt');
var u1 = new User("damian.iv","Damian","Ivanov","damian@abv.bg","asdasdasdasd");
console.log(bcrypt.compareSync("asdasdasdasd",u1.password))