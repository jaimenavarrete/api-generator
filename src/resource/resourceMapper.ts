import Property from './interfaces/Property';
import Resource from './interfaces/Resource';

// PostgreSQL row and Resource Mappings

export const mapFromRowToResource = (row: any): Resource => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    apiId: row.apiid,
    isBulkRemovable: row.isbulkremovable,
    properties: mapFromRequestBodyToPropertiesList(row.properties),
    tableCode: row.tablecode,
    creationDate: row.creationdate,
    lastModificationDate: row.lastmodification,
});

export const mapFromRowsToResourcesList = (
    rows: any[]
): Resource[] | undefined => {
    if (!rows) return undefined;

    return rows.map((row) => mapFromRowToResource(row));
};

// Resource and Request body Mappings

export const mapFromRequestBodyToResource = (request: any): Resource => ({
    id: '',
    name: request.name,
    slug: request.slug,
    description: request.description,
    apiId: request.apiId,
    isBulkRemovable: request.isBulkRemovable,
    tableCode: '',
    properties: mapFromRequestBodyToPropertiesList(request.properties),
    creationDate: new Date(),
});

// Property and Request body Mappings

export const mapFromRequestBodyToPropertiesList = (
    requestProperties: any[]
): Property[] | undefined => {
    if (!requestProperties) return undefined;

    return requestProperties.map((property) =>
        mapFromRequestBodyToProperty(property)
    );
};

export const mapFromRequestBodyToProperty = (
    requestProperty: any
): Property => ({
    id: '',
    name: requestProperty.name,
    typeId: requestProperty.typeId,
    resourceId: requestProperty.resourceId,
    isKey: requestProperty.isKey ?? false,
    isNullable: requestProperty.isNullable ?? false,
    defaultValue: requestProperty.defaultValue,
    referencedKeyId: requestProperty.referencedKeyId,
    creationDate: new Date(),
});
