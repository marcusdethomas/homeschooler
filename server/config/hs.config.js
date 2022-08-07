const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/homeschooler', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database.'))
    .catch(err => console.log('Connection failed. ', err));
