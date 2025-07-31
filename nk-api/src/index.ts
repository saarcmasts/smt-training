import Hapi from '@hapi/hapi';
import { AuthRouter } from './routes';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Allow all origins
                additionalHeaders: ['X-Requested-With', 'Authorization'],
                additionalExposedHeaders: ['X-Total-Count']
            }
        }
    });

    await server.register(AuthRouter);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();