import pool from '../common/database/postgresqlConnection';
import Resource from './interfaces/Resource';
import * as mapper from './resourceMapper';

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
