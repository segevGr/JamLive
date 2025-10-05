db = db.getSiblingDB('jamlive_dev');
db.createCollection('users');

db.users.insertOne({
	userName: 'admin',
	password: '$2b$10$IxOlVHdDcdI8bEVnZ/XEhOuJHDemf4eW2RsliYpZwjYNGk2NnqHEK',
	role: 'admin',
	instrument: 'Vocals',
	createdAt: new Date(),
	updatedAt: new Date(),
});

db.users.insertMany([
{
    userName: 'user',
    password: '$2b$10$PMjPdeDa7HNOK1plm0CaJuCf.RdPw0JyXGYNwBxTKWB7pScOHWH26',
    role: 'user',
    instrument: 'Guitar',
	createdAt: new Date(),
	updatedAt: new Date(),  
},
]);
