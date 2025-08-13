import Hapi from '@hapi/hapi';
import { AuthRouter, dashboardRoute } from './routes';
import { errorHandlerPlugin } from './plugin';
import { jwtPlugin } from './plugin/jwt';

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

    // Register error handler plugin first
    await server.register({
        plugin: errorHandlerPlugin,
        options: {
            showStackTrace: process.env.NODE_ENV === 'development',
            logErrors: true
        }
    });

    await server.register(AuthRouter);
    await server.register(dashboardRoute);
    await server.register(jwtPlugin);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();