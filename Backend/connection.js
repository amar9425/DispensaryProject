const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amarnathshukla8462:YEKYWfxXWfA2pSh4@cluster0.4h4pzst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
})
  .then(res => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.log('Error connecting to MongoDB:', err);

  })
