import { Server } from '@hapi/hapi';
import { LoginController, SignupController } from '../controller/auth';

const authRoute = {
    name: 'authRoute',
    register: async function (server: Server) {
        const pathPrefix = "/auth";

        server.route({
            method: 'POST',
            path: `${pathPrefix}/login`,
            handler: LoginController
        });

        server.route({
            method: 'POST',
            path: `${pathPrefix}/signup`,
            handler: SignupController
        });
    }
};

export default authRoute;