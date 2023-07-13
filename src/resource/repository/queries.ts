import { PropertyType } from '../enums/PropertyType';
import Resource from '../interfaces/Resource';

const getQueryToInsertResource = (resource: Resource) => {
    let sqlInsertResource =
        'INSERT INTO resources ' +
        '(id, name, slug, description, apiId, isBulkRemovable, tableCode, creationDate) VALUES ' +
        '($1, $2, $3, $4, $5, $6, $7, $8)';

    let valuesInsertResource = [
        resource.id,
        resource.name,
        resource.slug,
        resource.description,
        resource.apiId,
        resource.isBulkRemovable,
        resource.tableCode,
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
        case PropertyType.String:
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

export default {
    getQueryToInsertResource,
    getQueryToInsertProperties,
    getQueryToCreateTable,
};
