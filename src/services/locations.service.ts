import type { Pool } from 'pg';
import { NotFoundError } from '../utils/errors';

export const getAllCountries = async (db: Pool) => {
  const { rows } = await db.query<{
    id_country: number;
    country_name: string;
    iso_code: string;
  }>(`
    SELECT id_country, country_name, iso_code
    FROM public.countries
    ORDER BY country_name ASC
  `);

  return rows;
};

export const getRegionsByCountryIso = async (db: Pool, isoCode: string) => {
  const countryResult = await db.query<{ id_country: number }>(
    `SELECT id_country FROM public.countries WHERE iso_code = $1 LIMIT 1`,
    [isoCode.toUpperCase()]
  );

  if (countryResult.rowCount === 0) {
    throw new NotFoundError(`Country with ISO code '${isoCode}' not found`);
  }

  const { id_country } = countryResult.rows[0];

  const { rows } = await db.query<{
    id_region: number;
    region_name: string;
    iso_code: string;
    id_country: number;
  }>(`
    SELECT id_region, region_name, iso_code, id_country
    FROM public.regions
    WHERE id_country = $1
    ORDER BY region_name ASC
  `, [id_country]);

  return rows;
};

export const getCitiesByRegionIso = async (db: Pool, isoCode: string) => {
  const regionResult = await db.query<{ id_region: number }>(
    `SELECT id_region FROM public.regions WHERE iso_code = $1 LIMIT 1`,
    [isoCode.toUpperCase()]
  );

  if (regionResult.rowCount === 0) {
    throw new NotFoundError(`Region with ISO code '${isoCode}' not found`);
  }

  const { id_region } = regionResult.rows[0];

  const { rows } = await db.query<{
    id_city: number;
    city_name: string;
    dane_code: string;
    id_region: number;
  }>(`
    SELECT id_city, city_name, dane_code, id_region
    FROM public.cities
    WHERE id_region = $1
    ORDER BY city_name ASC
  `, [id_region]);

  return rows;
};
