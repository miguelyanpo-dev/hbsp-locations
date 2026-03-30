import type { RouteHandler } from '@hono/zod-openapi';
import { resolveDb } from '../../utils/request.utils';
import { getCitiesByRegionIso } from '../../services/locations.service';
import { NotFoundError } from '../../utils/errors';
import type { GetCitiesRoute } from '../../schemas/locations.schemas';

export const getCitiesHandler: RouteHandler<typeof GetCitiesRoute> = async (c) => {
  const resolved = resolveDb(c);
  if (resolved.kind === 'error') return c.json(resolved.body, resolved.status);
  const { db } = resolved;

  const { iso_code } = c.req.valid('query');

  try {
    const cities = await getCitiesByRegionIso(db, iso_code);
    return c.json({ success: true, data: cities }, 200);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return c.json({ success: false, error: 'Not Found', message: error.message }, 404);
    }
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return c.json({ success: false, error: 'Internal Server Error', message }, 500);
  }
};
