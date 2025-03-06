const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/v1', router);

// Add explicit root endpoint
server.get('/', (req, res) => {
  res.json({ message: 'Mock API Server is running' });
});

// Add custom routes before router
server.get('/v1/collections', (req, res) => {
  const db = router.db;
  const collections = db.get('collections').value();
  res.json(collections);
});

server.get('/v1/collections/:id', (req, res) => {
  const db = router.db;
  const collection = db.get('collections').find({ id: req.params.id }).value();
  res.json(collection || { error: 'Collection not found' });
});

server.listen(3001, () => {
  console.log('Mock API Server is running on port 3001');
  console.log('Test endpoint: http://localhost:3001/v1/collections');
}); 