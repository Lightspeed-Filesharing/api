const cluster = require('cluster');

if (cluster.isMaster) { // Count CPUs

    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU

    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    // Listen for dying workers

    cluster.on('exit', () => {
        cluster.fork();
    });

} else {
    require('./index.js');
}
