import { OpenAPIHono } from '@hono/zod-openapi';
import { GetCountriesRoute, GetRegionsRoute, GetCitiesRoute } from '../schemas/locations.schemas';
import { getCountriesHandler } from '../controllers/countries/get_countries';
import { getRegionsHandler } from '../controllers/regions/get_regions';
import { getCitiesHandler } from '../controllers/cities/get_cities';

const locationsRouter = new OpenAPIHono();

// Register schemas for OpenAPI documentation
locationsRouter.openAPIRegistry.registerPath(GetCountriesRoute);
locationsRouter.openAPIRegistry.registerPath(GetRegionsRoute);
locationsRouter.openAPIRegistry.registerPath(GetCitiesRoute);

// Register actual route handlers
locationsRouter.get('/countries', getCountriesHandler);
locationsRouter.get('/regions', getRegionsHandler);
locationsRouter.get('/cities', getCitiesHandler);

export default locationsRouter;
