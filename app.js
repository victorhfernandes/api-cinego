const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({msg: 'servidor rodando'});
});

require('./routes/scraping.router')(app);


app.listen(process.env.PORT || 3000, () => {
    console.log('app rodando');
});