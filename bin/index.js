const chalk = require('chalk');
const currentNodeVersion = process.versions.node; // 获取node版本
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 8){
    console.log(
        chalk.red(
            `您的Node版本：${major}
            \n
            创建项目需要Node 8+
            \n
            请更新Node
            `
        )
    );
    process.exit(1);
}

require('../commands/init');