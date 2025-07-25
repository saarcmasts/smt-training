import { Server } from '@hapi/hapi';

const myPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server: Server, options: unknown) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {

                return 'hello, world';
            }
        });
    }
};

export default myPlugin;