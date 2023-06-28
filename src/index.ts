const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.send('First Message');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
