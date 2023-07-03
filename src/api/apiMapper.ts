import Api from './interfaces/Api';

export const mapFromRowToApi = (row: any): Api => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    isPrivate: row.isprivate,
    creationDate: row.creationdate,
    lastModificationDate: row.lastmodification,
});

export const mapFromRowsToApisList = (rows: any[]): Api[] =>
    rows.map((row) => mapFromRowToApi(row));
