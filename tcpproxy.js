
const { listen, copy, connect } = Deno;

async function proxy(socket, endpoint) {
  console.log(`connection from client`, socket);
  console.log(`connecting to ${endpoint.hostname}:${endpoint.port}`);
  try {
    const remote = await connect(endpoint);
    await Promise.race([ copy(socket, remote), copy(remote, socket) ]);
    remote.close();
    socket.close();
    console.log(`client disconnected`);
  } catch(e) {
    console.error(e);
    socket.close();
    return;
  }
}

async function main(args) {
  const [ port, dest ] = args;
  const listener = listen({ port: port|0 });
  const [ hostname, destPort ] = dest.split(':');
  console.log(`listening on port ${port}`);
  for await (const socket of listener) {
    proxy(socket, { hostname, port: destPort|0 });      // don't await, allow multiple connections at once
  }
}

main(Deno.args);
