import pool from '../common/database/postgresqlConnection';
import Resource from './interfaces/Resource';
import * as mapper from './resourceMapper';
import crypto from 'crypto';

export const getAllResources = async () => {
    let sql = 'SELECT * FROM resources';

    try {
        const db = await pool.connect();

        const result = await db.query(sql);
        const resourcesList: Resource[] = mapper.mapFromRowsToResourcesList(
            result.rows
        );

        db.release();

        return resourcesList;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

export const getResourceById = async (id: string) => {
    let sql = 'SELECT * FROM resources WHERE id=$1';

    try {
        const db = await pool.connect();

        const result = await db.query(sql, [id]);
        const resource: Resource = mapper.mapFromRowToResource(result.rows[0]);

        db.release();

        return resource;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

const getQueryToInsertResource = (resource: Resource) => {
    let sqlInsertResource =
        'INSERT INTO resources ' +
        '(id, name, slug, description, apiId, isBulkRemovable, creationDate) VALUES ' +
        '($1, $2, $3, $4, $5, $6, $7)';

    let valuesInsertResource = [
        resource.id,
        resource.name,
        resource.slug,
        resource.description,
        resource.apiId,
        resource.isBulkRemovable,
        resource.creationDate,
    ];

    return { sqlInsertResource, valuesInsertResource };
};

export const insertResource = async (resource: Resource) => {
    resource.id = crypto.randomUUID();
    resource.creationDate = new Date();

    // Insert resource into table
    let { sqlInsertResource, valuesInsertResource } =
        getQueryToInsertResource(resource);

    try {
        const db = await pool.connect();

        await db.query(sqlInsertResource, valuesInsertResource);

        db.release();
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }
};
