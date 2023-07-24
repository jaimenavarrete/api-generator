import pool from '../common/database/postgresqlConnection';

export const getResourceItems = async (
    propertyNames: string[],
    tableCode: string
) => {
    let sql = 'SELECT ' + propertyNames.toString() + ' FROM ' + tableCode;

    try {
        const db = await pool.connect();

        const result = await db.query(sql);

        db.release();

        return result.rows;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};
