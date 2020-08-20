'use strict';

const db = require('mongoose');

db.connect('mongodb://127.0.0.1:27017/invigilator', {useNewUrlParser: true, useUnifiedTopology: true}).then(response => {
    console.log('connected mongo db');
}).catch(error => {
    if(error) {
        console.log('could not connect to mongo db -', error);
    }
});

db.set('useNewUrlParser', true);
db.set('useFindAndModify', false);
db.set('useCreateIndex', true);

module.exports = db;