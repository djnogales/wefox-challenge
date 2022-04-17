const common = [
    '--require-module ts-node/register' // Load TypeScript module
];

const challenge = [
    ...common,
    'tests/apps/challenge/features/**/*.feature',
    '--require tests/apps/challenge/features/step-definitions/*.steps.ts'
].join(' ');

module.exports = {
    challenge
};