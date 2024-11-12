import {Router} from 'express'
import fs from 'fs';
import path from 'path';

const router = Router();
const routesDir = __dirname;

const loadRoutes = ()=> {
    try {
        const files = fs.readdirSync(routesDir);
        for (const file of files) {
            if(file === `index.ts` || !file.endsWith(`.route.ts`)) continue;

            const route: Router = require(path.join(routesDir, file)).default;
            router.use(route);
        }
    } catch (e) {
        console.error(e);
    }
}

loadRoutes();

export default router;