import Hapi from '@hapi/hapi';
import Joi from 'joi';
import z from 'zod';
import { eq } from 'drizzle-orm';

import SamplePlugin from './plugin/sample';
import db from './db';
import { Auth } from './drizzle';

const zodLoginSchema = z.object({
    loginId: z.email(),
    password: z.string().min(6, { message: 'Password is required' })
})

const add = (a: number, b: number): number => {
    return a + b;
};

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(SamplePlugin);

    server.method('add', add);

    server.route({
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const { loginId, password } = zodLoginSchema.parse(request.payload);

            const user = await db.query.Auth.findFirst({
                where: (t, { eq }) => eq(t.loginId, loginId)
            });

            add(1, 2); // Example usage of the add function

            // const user = await db.select()
            //     .from(Auth)
            //     .where(eq(Auth.loginId, loginId))

            if (!user) {
                return h.response({ message: 'Invalid login credentials' }).code(401);
            }


            return {
                user,
                add: server.methods.add(1, 2), // Example usage of the add method
            };
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