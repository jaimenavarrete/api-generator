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

const getQueryToInsertProperties = (resource: Resource) => {
    let sqlInsertProperties =
        'INSERT INTO properties ' +
        '(id, name, typeId, resourceId, isKey, isNullable, defaultValue, referencedKeyId, creationDate) VALUES ';

    let valuesInsertProperties: any[] = [];

    resource.properties!.forEach((property, index) => {
        let position = 9 * index;
        let id = crypto.randomUUID();

        sqlInsertProperties += `
            ($${1 + position}, $${2 + position}, $${3 + position}, 
            $${4 + position}, $${5 + position}, $${6 + position}, 
            $${7 + position}, $${8 + position}, $${9 + position}),`;

        valuesInsertProperties = [
            ...valuesInsertProperties,
            id,
            property.name,
            property.typeId,
            resource.id,
            property.isKey,
            property.isNullable,
            null,
            null,
            property.creationDate,
        ];
    });

    // Remove last comma in query
    sqlInsertProperties = sqlInsertProperties.slice(0, -1);

    return { sqlInsertProperties, valuesInsertProperties };
};

export const insertResource = async (resource: Resource) => {
    resource.id = crypto.randomUUID();
    resource.creationDate = new Date();

    // Insert resource into table
    let { sqlInsertResource, valuesInsertResource } =
        getQueryToInsertResource(resource);

    // Insert properties into table
    let { sqlInsertProperties, valuesInsertProperties } =
        getQueryToInsertProperties(resource);

    try {
        const db = await pool.connect();

        await db.query(sqlInsertResource, valuesInsertResource);
        await db.query(sqlInsertProperties, valuesInsertProperties);

        db.release();
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }
};
