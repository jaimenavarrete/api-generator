import pool from '../common/database/postgresqlConnection';
import crypto from 'crypto';
import Api from './interfaces/Api';
import * as mapper from './apiMapper';

export const getAllApis = async () => {
    let sql = 'SELECT * FROM apis';

    try {
        const db = await pool.connect();

        const result = await db.query(sql);
        const apisList: Api[] = mapper.mapFromRowsToApisList(result.rows);

        db.release();

        return apisList;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

export const getApiById = async (id: string) => {
    let sql = 'SELECT * FROM apis WHERE id=$1;';

    try {
        const db = await pool.connect();

        const result = await db.query(sql, [id]);
        const api: Api = mapper.mapFromRowToApi(result.rows[0]);

        db.release();

        return api;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

export const getApiBySlug = async (slug: string) => {
    let sql = 'SELECT * FROM apis WHERE slug=$1;';

    try {
        const db = await pool.connect();

        const result = await db.query(sql, [slug]);
        const api: Api = mapper.mapFromRowToApi(result.rows[0]);

        db.release();

        return api;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

export const insertApi = async (api: Api) => {
    api.id = crypto.randomUUID();
    api.creationDate = new Date();

    let sql =
        'INSERT INTO apis (id, name, slug, description, isPrivate, creationDate)' +
        'VALUES ($1, $2, $3, $4, $5, $6)';

    const sqlValues = [
        api.id,
        api.name,
        api.slug,
        api.description,
        api.isPrivate,
        api.creationDate,
    ];

    try {
        const db = await pool.connect();

        const result = await db.query(sql, sqlValues);

        console.log(result);

        db.release();
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }
};
