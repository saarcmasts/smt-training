import jwt from 'jsonwebtoken';

export const jwtPlugin = {
    name: 'jwt',
    version: '1.0.0',
    register: async function (server, options) {
        server.ext('onRequest', (request, h) => {
            const authHeader = request.headers['authorization'];
            const { path } = request;
            if(['/auth/login', '/auth/signup'].includes(path)) return h.continue;
            if (authHeader) {
                try {
                    const token = authHeader.split(' ')[1];
                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
                    console.log('Decoded JWT:', decoded);
                    request.user = decoded;
                    return h.continue;
                } catch (err) {
                    console.error('JWT verification failed:', err);
                    return h.response({ error: 'Unauthorized' }).code(401).takeover();
                }
            } else {
                console.warn('No Authorization header found');
                return h.response({ error: 'Unauthorized' }).code(401).takeover();
            }
        });
    }
}