import Hapi from '@hapi/hapi';
import Joi from 'joi';

import db from './db';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.ext({
        type: 'onRequest',
        method: function (request, h) {
            // Change all requests to '/test'

            console.log('Request received:', request.method.toUpperCase(), request.path);

            return h.continue;
        }
    });

    server.ext({
        type: 'onPreResponse',
        method: function (request, h) {
            // Change all requests to '/test'

            console.log('On pre-response:', request.method.toUpperCase(), request.path);

            return h.continue;
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            try {

                console.log("Inside the handler");

                request.params;
                request.payload;

                const tables = await db.execute('select * from user');

                return tables;
            } catch (error) {
                console.error('Error fetching users:');
                console.error(error);
                return h.response('Internal Server Error').code(500);
            }
        },
        options: {
            // validate: {
            //     query: {
            //         username: Joi.string().min(1).max(20),
            //         password: Joi.string().min(7)
            //     }
            // }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();