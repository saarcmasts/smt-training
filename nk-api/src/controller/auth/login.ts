import { Request, ResponseToolkit } from '@hapi/hapi';
import { object, email, string } from 'zod/v4';

const zodLoginSchema = object({
    loginId: email(),
    password: string().min(6, { message: 'Password is required' })
})

export default function (request: Request, h: ResponseToolkit) {

    const { loginId, password } = zodLoginSchema.parse(request.payload);

    return { loginId, password };
}