const mongoose =  require('mongoose');
const env = require('dotenv').config();
const URI = 'mongodb+srv://gkwillg:' + process.env.MONGO_ATLAS_PW + '@cluster0.vaexp.mongodb.net/SampleZoo?retryWrites=true&w=majority';
const readLine = require('readline');

/* Setup connection params */
const connect = () => {
    setTimeout(() => mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }), 1000);
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to MongoDB`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ('SIGINT', () => {
        process.emit ("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
});
};

/* Handlers for process termination signals */

/* For nodemon restarts */
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

/* For app termination */
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

/* For AWS app termination */
process.on('SIGTERM', () => {
    gracefulShutdown('ECS app shutdown', () => {
        process.exit(0);
    });
});

connect();