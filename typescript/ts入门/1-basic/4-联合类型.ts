let numOrString: string | number;
numOrString = 1;
numOrString = "hello world";

function getLength(something: string | number[]): number {
  return something.length;
}
