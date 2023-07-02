const fs = require('fs');

const PREFIX = '@wumvi/wm.';

const result = {};
const packageRaw = fs.readFileSync('package.json');
const packageJson = JSON.parse(packageRaw);
for (const name of Object.keys(packageJson['devDependencies'])) {
    if (name.substring(0, PREFIX.length) === PREFIX) {
        result[name + '/*'] = ['node_modules/' + name + '/src/*'];
    }
}

findWmModule('./');

const resultText = JSON.stringify(
    {'compilerOptions': {'paths': result}},
    null,
    4,
);
fs.writeFile('tsconfig-autogen.json', resultText, {flag: 'w'}, err => {});

function findWmModule(path) {
    const packageJsonFile = path + 'package.json';
    if (!fs.existsSync(packageJsonFile)) {
        return;
    }
    console.log('Found package:', packageJsonFile);
    const packageRaw = fs.readFileSync(packageJsonFile);
    const packageJson = JSON.parse(packageRaw);

    for (const name of Object.keys(packageJson['dependencies'])) {
        if (name.substring(0, PREFIX.length) === PREFIX) {
            const pathModule = 'node_modules/' + name + '/';
            const key = name + '/*';
            if (result[key] !== undefined) {
                continue;
            }
            result[key] = [pathModule + 'src/*'];
            findWmModule(pathModule);
        }
    }
}