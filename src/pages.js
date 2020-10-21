const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
  index: function (req, res) {
    return res.render('index');
  },
  orphanage: async function (req, res) {
    const id = req.query.id;
    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = "${id}"`
      );
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(',');
      orphanage.firstImage = orphanage.images[0];

      if (orphanage.open_on_weekends == '0') {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }

      return res.render('orphanage', { orphanage });
    } catch (error) {
      console.log(error);
      return res.send('Error in database!');
    }
  },
  orphanages: async function (req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all('SELECT * FROM orphanages');
      return res.render('orphanages', { orphanages });
    } catch (error) {
      console.log(error);
      return res.send('Error in database!');
    }
  },
  createOrphanage: function (req, res) {
    return res.render('create-orphanage');
  },
  saveOrphanage: async function (req, res) {
    const fields = req.body;
    fields.images = fields.images.toString();

    // validate if lat and log not empty
    if (Object.values(fields).includes('')) {
      res.send('Todos os campos devem ser preenchidos');
    }

    try {
      // save orphanage
      const db = await Database;
      await saveOrphanage(db, { ...fields });

      // redirect to page orphanages
      res.redirect('/orphanages');
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!');
    }
  },
};
