import { OpenAPIHono } from '@hono/zod-openapi';
import { GetCountriesRoute, GetRegionsRoute, GetCitiesRoute } from '../schemas/locations.schemas';
import { getCountriesHandler } from '../controllers/countries/get_countries';
import { getRegionsHandler } from '../controllers/regions/get_regions';
import { getCitiesHandler } from '../controllers/cities/get_cities';

const locationsRouter = new OpenAPIHono();

locationsRouter.openapi(GetCountriesRoute, getCountriesHandler);
locationsRouter.openapi(GetRegionsRoute, getRegionsHandler);
locationsRouter.openapi(GetCitiesRoute, getCitiesHandler);

export default locationsRouter;
