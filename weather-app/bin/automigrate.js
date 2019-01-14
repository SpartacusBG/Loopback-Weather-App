'use strict';

const app = require( '../server/server');
const ds = app.datasources.mysqlDs;
const models = [
    'Customer',
    'User',
    'AccessToken',
    'ACL',
    'RoleMapping',
    'Role',
    'Message'
]
ds.automigrate(models, (err) => {
    if (err) { throw err; }
    console.log('modles created');
    ds.disconnect();
    process.exit();
})