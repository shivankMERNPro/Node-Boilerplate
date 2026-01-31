import helmet from "helmet";
import { HelmetOptions } from "helmet";

const helmetOptions: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
        },
    },

    // Helps avoid issues with React/Vite frontend
    crossOriginEmbedderPolicy: false,
};

const helmetMiddleware = helmet(helmetOptions);

export default helmetMiddleware;
