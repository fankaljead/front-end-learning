// let i = 0;
// self.onconnect = () => console.log(`connected ${++i} times`);

const connectedPorts = new Set();
self.onconnect = ({ ports }) => {
  connectedPorts.add(ports[0]);
  console.log(`${connectedPorts.size} unique connected ports`);
};
