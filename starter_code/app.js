const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));

app.get('/beers', (req, res) => {
    punkAPI
      .getBeers()
      .then(responseFromApi => 
        // console.log('Beers from the database: ', responseFromApi))
      res.render('beers.hbs', { beers: responseFromApi })
      .catch(error => console.log(error))
)});

  app.get('/random-beer', (req, res) => {
    punkAPI
      .getRandom()
      .then(responseFromApi => 
        // console.log('Random Beer from the database: ', responseFromApi))
      res.render('random-beer.hbs', { beer: responseFromApi[0] })
      .catch(error => console.log(error))
  )});