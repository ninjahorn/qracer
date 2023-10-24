
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const User = require('./userModel');

app.use(express.static('public'));

// Connect to your MongoDB Atlas cluster
mongoose.connect('mongodb+srv://ninjahorn:BQeE3KOmm6X298pU@cluster0.jecisam.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Erfolgreich mit der MongoDB Atlas-Datenbank verbunden');
  }).catch((err) => {
    console.error('Fehler beim Verbinden zur MongoDB Atlas-Datenbank: ' + err);
  });


app.use('/', userRoutes(User)); 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mainpage.html');
  });

app.get('/help.html', (req, res) => {
  res.sendFile(__dirname + '/help.html');
});

app.get('/qrcode1000.html', (req, res) => {
  res.sendFile(__dirname + '/qrcode1000.html');
});
app.get('/qrcode2000.html', (req, res) => {
  res.sendFile(__dirname + '/qrcode2000.html');
});
app.get('/qrcode3000.html', (req, res) => {
  res.sendFile(__dirname + '/qrcode3000.html');
});

app.get('/mainpage.html', (req, res) => {
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/impressum.html', (req, res) => {
  res.sendFile(__dirname + '/impressum.html');
});

app.get('/kontakt.html', (req, res) => {
  res.sendFile(__dirname + '/kontakt.html');
});

const port = process.env.PORT || 3000; // Verwende den von Azure bereitgestellten Port oder den Port 3000 als Standardwert

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = User;