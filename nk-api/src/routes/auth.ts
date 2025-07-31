import { Server } from '@hapi/hapi';
import { LoginController } from '../controller/auth';

const authRoute = {
    name: 'authRoute',
    register: async function (server: Server) {
        const pathPrefix = "/auth";

        server.route({
            method: 'POST',
            path: `${pathPrefix}/login`,
            handler: LoginController
        });
    }
};

export default authRoute;