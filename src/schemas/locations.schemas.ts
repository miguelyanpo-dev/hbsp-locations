import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';
import { ErrorResponse, SuccessResponse } from './response.schemas';

// ─── Country ──────────────────────────────────────────────────────────────────

export const CountrySchema = z.object({
  id_country: z.number(),
  country_name: z.string(),
  iso_code: z.string(),
});

export const GetCountriesRoute = createRoute({
  method: 'get',
  path: '/countries',
  summary: 'Listar todos los países',
  description: 'Retorna todos los países registrados en la base de datos.',
  tags: ['Countries'],
  request: {
    query: z.object({
      ref: z.string().min(1).openapi({ description: 'Referencia del tenant en Supabase', example: 'abcdefghijkl' }),
    }),
  },
  responses: {
    200: {
      description: 'Lista de países obtenida exitosamente',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Parámetro ref requerido',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    500: {
      description: 'Error interno del servidor',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

// ─── Region ───────────────────────────────────────────────────────────────────

export const RegionSchema = z.object({
  id_region: z.number(),
  region_name: z.string(),
  iso_code: z.string(),
  id_country: z.number(),
});

export const GetRegionsRoute = createRoute({
  method: 'get',
  path: '/regions',
  summary: 'Listar regiones por país',
  description: 'Retorna todas las regiones/departamentos de un país, filtrando por el ISO code del país (ej: COL).',
  tags: ['Regions'],
  request: {
    query: z.object({
      ref: z.string().min(1).openapi({ description: 'Referencia del tenant en Supabase', example: 'abcdefghijkl' }),
      iso_code: z.string().min(2).max(3).openapi({ description: 'ISO code del país', example: 'COL' }),
    }),
  },
  responses: {
    200: {
      description: 'Lista de regiones obtenida exitosamente',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Parámetros requeridos faltantes',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'País no encontrado',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    500: {
      description: 'Error interno del servidor',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

// ─── City ─────────────────────────────────────────────────────────────────────

export const CitySchema = z.object({
  id_city: z.number(),
  city_name: z.string(),
  dane_code: z.string(),
  id_region: z.number(),
});

export const GetCitiesRoute = createRoute({
  method: 'get',
  path: '/cities',
  summary: 'Listar ciudades por región',
  description: 'Retorna todas las ciudades de una región, filtrando por el ISO code de la región (ej: CO-ANT).',
  tags: ['Cities'],
  request: {
    query: z.object({
      ref: z.string().min(1).openapi({ description: 'Referencia del tenant en Supabase', example: 'abcdefghijkl' }),
      iso_code: z.string().min(2).openapi({ description: 'ISO code de la región', example: 'CO-ANT' }),
    }),
  },
  responses: {
    200: {
      description: 'Lista de ciudades obtenida exitosamente',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Parámetros requeridos faltantes',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Región no encontrada',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    500: {
      description: 'Error interno del servidor',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});
