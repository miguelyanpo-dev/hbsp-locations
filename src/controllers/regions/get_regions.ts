import type { Context } from 'hono';
import { resolveDb } from '../../utils/request.utils';
import { getRegionsByCountryIso } from '../../services/locations.service';
import { NotFoundError } from '../../utils/errors';

export const getRegionsHandler = async (c: Context) => {
  const resolved = resolveDb(c);
  if (resolved.kind === 'error') return c.json(resolved.body, resolved.status);
  const { db } = resolved;

  const iso_code = c.req.query('iso_code')?.trim();
  if (!iso_code) {
    return c.json({ success: false, error: 'Bad Request', message: 'iso_code query parameter is required' }, 400);
  }

  try {
    const regions = await getRegionsByCountryIso(db, iso_code);
    return c.json({ success: true, data: regions }, 200);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return c.json({ success: false, error: 'Not Found', message: error.message }, 404);
    }
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return c.json({ success: false, error: 'Internal Server Error', message }, 500);
  }
};
