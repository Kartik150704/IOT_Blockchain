const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


const Administrator=require('./Administrator/Administrator')
app.use(Administrator)













const PORT = process.env.PORT || 8000; // Use the environment port or 3000 if not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
