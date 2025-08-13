import { Server } from '@hapi/hapi';
import { id } from 'zod/locales';

const dashboardRoute = {
    name: 'dashboardRoute',
    register: async function (server: Server) {

        server.route({
            method: 'GET',
            path: `/dashboard`,
            handler: request => {
                // Placeholder for dashboard logic
                return {
                    message: 'Dashboard route accessed', data: [{
                        id: 1,
                        title: 'Dashboard Item 1',
                        description: 'Description for Dashboard Item 1'
                    },
                    {
                        id: 2,
                        title: 'Dashboard Item 2',
                        description: 'Description for Dashboard Item 2'
                    }
                    ]
                };
            }
        });
    }
};

export default dashboardRoute;