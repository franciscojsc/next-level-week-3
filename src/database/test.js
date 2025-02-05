const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async (db) => {
  console.log(db);

  const data = {
    lat: '-27.222633',
    lng: '-49.6555874',
    name: 'Lar dos meninos',
    about:
      'Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.',
    whatsapp: '88888-8888',
    images: [
      'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
      'https://images.unsplash.com/photo-1598749953342-b4ee75629dca?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
    ].toString(),
    instructions:
      'Venha como se sentir a vontade e traga muito amor e paciência para dar.',
    opening_hours: 'Horário de visitas Das 18h até 8h',
    open_on_weekends: '0',
  };

  // insert data in table
  await saveOrphanage(db, data);

  // query data in table
  const selectedData = await db.all('SELECT * FROM orphanages');
  console.log(selectedData);

  // query only 1 orphanage by id
  const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "2"');
  console.log(orphanage);

  // delete data in table
  await db.run("DELETE FROM orphanages WHERE id = '2'");
});
