import pool from '../common/database/postgresqlConnection';
import Api from './interfaces/Api';

const getAllApis = async () => {
    let sql = 'SELECT * FROM apis';

    try {
        const db = await pool.connect();

        const result = await db.query(sql);
        const apisList: Api[] = result.rows;

        db.release();

        return apisList;
    } catch (err) {
        console.error('An error has occurred with the connection', err);
    }

    return undefined;
};

export default { getAllApis };
