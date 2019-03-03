const packageInfo = require('../package');
const program = require('commander');

program
    .version(packageInfo.version)
    .usage('<command> [options]');

program
    .command('create <app-name>')
    .description('create a new project react app')
    .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
    .option('-t, --template <templateName>', 'Skip prompts choice template')
    .action((name, cmd) => {
        require('../lib/create')(name, []);
    });

program.parse(process.argv);



