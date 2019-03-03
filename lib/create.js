const ora = require('ora');
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const packageInfo = require('../package');
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

const defaultName = typeof packageInfo.name !== 'undefined' ? packageInfo.name : 'react-project';
const baseModules = [
    { name: 'react', value: 'react' },
];
const combineModules = [
    ...baseModules,
    { name: 'react-router', value: 'react-router-dom', disabled: false },
    { name: 'redux', value: 'redux', disabled: false },
    { name: 'eslint', value: 'eslint', disabled: false },
    { name: 'prettier', value: 'prettier', disabled: false },
];
const question = [
    {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: defaultName,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            const validate = (val.trim().split(" ")).length === 1
            return validate || 'Project name is not allowed to have spaces ';
        },
        transformer(val) {
            return val;
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'React project',
        validate (val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    },
    {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'project author',
        validate (val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    },
    {
        name: 'modules',
        type: 'checkbox-plus',
        message: `select modules you want`,
        source: function (answersSoFar, input) {
            input = input || '';
            return new Promise(function(resolve) {
                const fuzzyResult = fuzzy.filter(input, combineModules, {
                    extract: function(item) {
                        return item['name'];
                    }
                });
                const data = fuzzyResult.map(function(element) {
                    return element.original;
                });
                resolve(data);
            });
        }
    }
];


async function create(name, options){
    console.log(name);
    const { ...rest } = await inquirer.prompt(question);
    // .then(({name, author, desc, choice }) => {
    //     const projectName = name;
    //     const spinner = ora('create react project please wait...');
    //     spinner.start();
    // });
    console.log(rest);
}

module.exports = (...args) => {
  return create(...args)
};