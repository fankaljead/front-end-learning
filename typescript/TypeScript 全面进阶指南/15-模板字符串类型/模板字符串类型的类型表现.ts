type Version = `${number}.${number}.${number}`;

declare let v1: Version;
declare let v2: "1.1.1";
v1 = v2;
v2 = v1;

const greet = (to: string): `Hello ${string}` => {
  return `Hello ${to}`;
};
