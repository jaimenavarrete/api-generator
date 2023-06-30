import express from 'express';
import apiRoutes from './api/apiRoutes';

const app = express();
app.use(express.json());

app.use('/apis', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
