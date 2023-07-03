import Resource from './interfaces/Resource';

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
