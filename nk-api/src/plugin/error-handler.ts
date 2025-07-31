import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Boom, { badRequest } from '@hapi/boom';
import { ZodError } from 'zod';

interface ErrorHandlerOptions {
    showStackTrace?: boolean;
    logErrors?: boolean;
}

const errorHandlerPlugin = {
    name: 'error-handler',
    version: '1.0.0',
    register: async function (server: Server, options: ErrorHandlerOptions = {}) {
        const { showStackTrace = false, logErrors = true } = options;

        // Global error handling for unhandled errors
        server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
            const response = request.response;

            if(response instanceof ZodError) {
                return badRequest('Input validation failed', response)
            }

            // Check if response is an error
            if (!Boom.isBoom(response)) {
                return h.continue;
            }

            const error = response;

            // Log the error if logging is enabled
            if (logErrors) {
                console.error('Error occurred:', {
                    url: request.url.href,
                    method: request.method.toUpperCase(),
                    statusCode: error.output.statusCode,
                    message: error.message,
                    stack: showStackTrace ? error.stack : undefined,
                    payload: request.payload,
                    query: request.query,
                    params: request.params,
                    timestamp: new Date().toISOString()
                });
            }

            return h.continue;
        });
    }
};

export default errorHandlerPlugin;
