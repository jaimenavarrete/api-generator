import express from 'express';
import bodyParser from 'body-parser';

import apiManagementRoutes from './apiManagement/apiManagementRoutes';
import apiRoutes from './api/apiRoutes';
import resourceRoutes from './resource/resourceRoutes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', apiManagementRoutes);
app.use('/apis', apiRoutes);
app.use('/resources', resourceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
