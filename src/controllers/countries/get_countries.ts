import type { RouteHandler } from '@hono/zod-openapi';
import { resolveDb } from '../../utils/request.utils';
import { getAllCountries } from '../../services/locations.service';
import type { GetCountriesRoute } from '../../schemas/locations.schemas';

export const getCountriesHandler: RouteHandler<typeof GetCountriesRoute> = async (c) => {
  const resolved = resolveDb(c);
  if (resolved.kind === 'error') return c.json(resolved.body, resolved.status);
  const { db } = resolved;

  try {
    const countries = await getAllCountries(db);
    return c.json({ success: true, data: countries }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return c.json({ success: false, error: 'Internal Server Error', message }, 500);
  }
};
