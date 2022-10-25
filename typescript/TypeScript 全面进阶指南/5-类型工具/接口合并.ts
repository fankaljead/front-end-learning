interface Struct11 {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
  unionProp: string | number;
}

interface Struct11 {
  primitiveProp: boolean;
}

interface Struct22 extends Struct11 {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
  unionProp: boolean;
}

interface Struct33 extends Struct11 {
  name: string;
}

type Struct33Keys = keyof Struct33;

interface IITer {
  name: string;
}

// 类型合并接口
type TIP<T> = { age: T } & IITer;

declare const tipss: TIP<number>;
tipss.name;
tipss.age;

// 接口继承类型
interface IIIIdfd extends TIP<boolean> {
  func: () => number;
}
declare const iiids: IIIIdfd;
iiids.name;
iiids.age;
iiids.func();
