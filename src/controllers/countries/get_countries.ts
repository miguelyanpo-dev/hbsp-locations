import type { Context } from 'hono';
import { resolveDb } from '../../utils/request.utils';
import { getAllCountries } from '../../services/locations.service';

export const getCountriesHandler = async (c: Context) => {
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
