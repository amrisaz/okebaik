const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const manualPoRoutes = require('./routes/manualPoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/manualpo', manualPoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





