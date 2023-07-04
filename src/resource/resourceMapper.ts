import Resource from './interfaces/Resource';

// PostgreSQL row and Resource Mappings

export const mapFromRowToResource = (row: any): Resource => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    apiId: row.apiid,
    isBulkRemovable: row.isbulkremovable,
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
    creationDate: new Date(),
});
