import pool from '../common/database/postgresqlConnection';
import { PropertyType } from './enums/PropertyType';
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

        sqlInsertProperties += `
            ($${1 + position}, $${2 + position}, $${3 + position}, 
            $${4 + position}, $${5 + position}, $${6 + position}, 
            $${7 + position}, $${8 + position}, $${9 + position}),`;

        valuesInsertProperties = [
            ...valuesInsertProperties,
            property.id,
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

const getPropertyType = (type: PropertyType) => {
    switch (type) {
        case PropertyType.Varchar:
            return 'VARCHAR(256)';
        case PropertyType.Text:
            return 'TEXT';
        case PropertyType.Int:
            return 'INT';
        case PropertyType.Decimal:
            return 'DECIMAL(10,2)';
        default:
            return undefined;
    }
};

const getQueryToCreateTable = (resource: Resource) => {
    let sqlCreateTable = `CREATE TABLE ${resource.tableCode} (`;

    resource.properties!.forEach((property) => {
        let name = property.name,
            type = getPropertyType(property.typeId),
            isNullable = property.isNullable ? '' : 'NOT NULL',
            isKey = property.isKey ? 'PRIMARY KEY' : '';

        sqlCreateTable += `${name} ${type} ${isNullable} ${isKey},`;
    });

    // Remove last comma in query
    sqlCreateTable = sqlCreateTable.slice(0, -1) + ')';

    return { sqlCreateTable };
};

export const insertResource = async (resource: Resource) => {
    let { sqlInsertResource, valuesInsertResource } =
        getQueryToInsertResource(resource);

    let { sqlInsertProperties, valuesInsertProperties } =
        getQueryToInsertProperties(resource);

    let { sqlCreateTable } = getQueryToCreateTable(resource);

    try {
        const db = await pool.connect();

        // Insert resource into table
        await db.query(sqlInsertResource, valuesInsertResource);

        // Insert properties into table
        await db.query(sqlInsertProperties, valuesInsertProperties);

        // Create resource table
        await db.query(sqlCreateTable);

        db.release();
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }
};
