module.exports = {
    apps: [
        {
            name: 'Kahera',
            exec_mode: 'cluster',
            instances: 1,
            script: './.output/server/index.mjs',
            args: 'start'
        }
    ]
}