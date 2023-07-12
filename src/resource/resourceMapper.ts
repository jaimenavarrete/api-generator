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
    creationDate: row.creationdate,
    lastModificationDate: row.lastmodification,
});

export const mapFromRowsToResourcesList = (rows: any[]): Resource[] =>
    rows.map((row) => mapFromRowToResource(row));

// Resource and Request body Mappings

export const mapFromRequestBodyToResource = (request: any): Resource => ({
    id: '',
    name: request.name,
    slug: request.slug,
    description: request.description,
    apiId: request.apiId,
    isBulkRemovable: request.isBulkRemovable,
    properties: mapFromRequestBodyToPropertiesList(request.properties),
    creationDate: new Date(),
});

// Property and Request body Mappings

export const mapFromRequestBodyToPropertiesList = (
    requestProperties: any[]
): Property[] =>
    requestProperties.map((property) => mapFromRequestBodyToProperty(property));

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
