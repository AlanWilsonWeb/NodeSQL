const Sequelize = require("Sequelize");
const sequelize = new Sequelize("Music", "michael", null, {
  host: "localhost",
  dialect: "sqlite",
  storage: "chinook.sqlite",
  operatorsAliases: false
});
const Artist = sequelize.define(
  "Artist",
  {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
const Album = sequelize.define(
"Album",
{
  AlbumId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ArtistId: Sequelize.INTEGER,
  Title: Sequelize.STRING
},
{
  freezeTableName: true,
  timestamps: false
}
);
//PITA JOIN CODE (Part One)
Album.belongsTo(Artist, {foreignKey: 'ArtistId'})

const express = require("express");
const app = express();
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set("port", process.env.PORT || 3000);

app.get('/', (request, response) => {
    response.render('home');
});

app.get('/about', (request, response) => {
    response.render('about');
});

app.get('/beginning', (request, response) => {
    response.render('beginning');
});

//PITA JOIN CODE (Part Two)
app.get('/album', (req, res) => {
  Album.findAll({ include: [Artist]})
    .then(albums => {
      res.render('album', {
        albums: albums
      });
  });
});

app.use((request, response) => {
    response.status(404);
    response.render('404');
});

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});

// Artist.findAll({ limit : 10 }).then(artists => {
//   const artistFunc = JSON.stringify(artists);
//   console.log(artistFunc);
// });
//
//
// Album.findAll({ limit : 10 }).then(albums => {
//   const albumFunc = JSON.stringify(albums);
//   console.log(albumFunc);
// });

// Artist.find({ where: { ArtistId: 75 } }).then(artists => {
//   console.log(JSON.stringify(artists));
// });
