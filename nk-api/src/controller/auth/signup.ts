import { Request, ResponseToolkit } from '@hapi/hapi';
import { object, email, string } from 'zod/v4';
import db from '../../db';
import { users, Auth } from '../../drizzle';

const zodSignupSchema = object({
    email: email({message: "Please check the Email field type"}).min(1, { message: 'Email is required' }),
    firstname: string().min(2, { message: 'Firstname is required' }),
    lastname: string().min(2, { message: 'Lastname is required' }),
    password: string().min(6, { message: 'Password is required' })
})

export default async function (request: Request, h: ResponseToolkit) {

    try {
        const { email, firstname, lastname, password } = zodSignupSchema.parse(request.payload);

        const user = await db.insert(users).values({
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            postalCode: null,
            country: null,
            dateOfBirth: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isVerified: false,
            lastLogin: new Date(),
            passwordHash: password
        }).onConflictDoUpdate({
            target: [users.email],
            set: {
                updatedAt: new Date(),
                firstName: firstname
            }
        }).returning().then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
        })
        if (user) {
            return h.response({ message: 'User created successfully', user }).code(201);
        } else {
            return h.response({ error: 'User not created' }).code(400);
        }
    } catch (error) {
        console.error("Signup error:", error);
        return h.response({ error: JSON.parse(error)[0].message }).code(400);
    }
}