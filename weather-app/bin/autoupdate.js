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
];
ds.autoupdate(models, (err) => {
    if (err) { throw err; }
    console.log('modles synced');
    ds.disconnect();
    process.exit();
})