import { Request, ResponseToolkit } from '@hapi/hapi';
import { object, email, string } from 'zod/v4';
import db from '../../db';
import { users, Auth } from '../../drizzle';
import { eq, sql } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const zodLoginSchema = object({
    loginId: email(),
    password: string().min(6, { message: 'Password is required' })
})

export default async function (request: Request, h: ResponseToolkit) {

    try {
        const { loginId, password } = zodLoginSchema.parse(request.payload);

        const user = await db.query.users.findFirst({
            where: eq(users.email, loginId),
            columns: {
                email: true,
                firstName: true,
                lastName: true
            }
        });
        if (!user || user === null) {
            return h.response({ error: 'User not found' }).code(404);
        } else {
            const secret: string = process.env.JWT_SECRET || '';
            let token = jwt.sign({ email: user.email, firstName: user.firstName }, secret, {
                expiresIn: '1h'
            });
            return h.response({ message: 'User found', token }).code(200);
        }
    } catch (error) {
        console.error("Login error:", error);
        return h.response({ error: 'Invalid login credentials' }).code(400);
    }
}