type A = string;

type StatusCode = 200 | 202;
type PossibleDataTypes = string | number | (() => unknown);

const statusi: StatusCode = 200;

type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => {};

type ObjType = {
  name: string;
  age: number;
};

type Factory<T> = T | number | string;

const foo: Factory<boolean> = false;

type FactoryWithBool = Factory<boolean>;
let foo2: FactoryWithBool = true;
foo2 = foo;

type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "zxh",
  age: 24,
};

type StrAndNum = string & number;

type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};
type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};
type Composed = Struct11 & Struct22;
type PrimitivePropType = Composed["primitiveProp"];
type ObjectPropType = Composed["objectProp"];

type UnionIntersection1 = (1 | 2 | 3) & (1 | 2);
type UnionzIntersection2 = (string | number | symbol) & string;
