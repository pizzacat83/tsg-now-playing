const fastify = require('fastify')({logger: true});
const path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', 'public'),
});

fastify.register(require('./sse'));

fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

fastify.get('/events', (request, reply) => {
  const options = {};

  reply.sse('sample data', options);

  setInterval(() => {
    index++;
    reply.sse({id: 'd_T1StgldnM', t: 0}); // iwashi
  }, 10000);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
