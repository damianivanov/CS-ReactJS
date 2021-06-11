const mongoose = require('mongoose');
const uri = process.env.DB_CONNECT
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Connected to the database!`);
}).catch((e) => {
    console.log('Error connecting to the database!');
    console.log(e);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = { mongoose };