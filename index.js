'use strict';

var migrations = require('./dynamodb/migrations'),
    tableOpt = {
        prefix: "",
        suffix: ""
    },
    dynamo, dir;

var manager = {
    init: function (dynamodb, migrationDir) {
        dynamo = dynamodb;
        dir = migrationDir;
    },
    create: function (migrationName) {
        return migrations.create(migrationName, {
            dir: dir
        });
    },
    execute: function (migrationName, tableOptions) {
        tableOptions = tableOptions || tableOpt;
        return migrations.execute(dynamo, {
            dir: dir,
            migrationName: migrationName,
            tablePrefix: tableOptions.prefix,
            tableSuffix: tableOptions.suffix
        });
    },
    executeAll: function (tableOptions) {
        tableOptions = tableOptions || tableOpt;
        return migrations.executeAll(dynamo, {
            dir: dir,
            tablePrefix: tableOptions.prefix,
            tableSuffix: tableOptions.suffix
        });
    }
};
module.exports = manager;
