const fastify = require('fastify')({logger: true});
const path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', 'public'),
});

fastify.register(require('./sse'));

fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

fastify.register(require('./youtube'));

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
