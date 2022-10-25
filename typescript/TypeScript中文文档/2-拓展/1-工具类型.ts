// Partial<Type>
// 用于构造一个Type下面的所有属性都设置为可选的类型，这个工具类型会返回代表给定的一个类型的子集的类型
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

// Required<Type>
// 用于构造一个Type下面的所有属性全都设置为必填的类型，这个工具类型跟 Partial (opens new window)相反
interface Props {
  a?: number;
  b?: number;
}
const obj: Props = { a: 4 };
// const obj2: Required<Props> = { a: 6 };
const obj2: Required<Props> = { a: 6, b: 2 };

// Readonly<Type>
// 用于构造一个Type下面的所有属性全都设置为只读的类型，意味着这个类型的所有的属性全都不可以重新赋值
const todo3: Readonly<Todo> = {
  title: "write some words",
  description: "blabla",
};
// todo3.description = ''

// Record<Keys, Type>
// 用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型。这个工具类型可以被用于映射一个类型的属性到另一个类型。
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

// Pick<Type, Keys>
// 用于构造一个类型，它是从Type类型里面挑了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)
interface LTodo extends Todo {
  completed: boolean;
}
type TodoPreview = Pick<LTodo, "title" | "completed">;
const todo4: TodoPreview = {
  title: "clean room",
  completed: false,
};

// Omit<Type, Keys>
// 用于构造一个类型，它是从Type类型里面过滤了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)
type OTodoPreview = Omit<LTodo, "description">;
const todo5: OTodoPreview = {
  title: "clean room",
  completed: true,
};

// Exclude<UnionType, ExcludedMembers>
// 用于构造一个类型，它是从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型
type T0 = Exclude<"a" | "b" | "c", "a">;
type T1 = Exclude<"a" | "b" | "c", "a" | "c">;
type T2 = Exclude<string | number | (() => void), Function>;

// Extract<Type, Union>
// 用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型 交集
type TT0 = Extract<"a" | "b" | "c", "a" | "f">;
type TT1 = Extract<string | number | (() => void), Function>;

// NonNullable<Type>
// 于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型
type TTT0 = NonNullable<string | number | undefined>;
type TTT1 = NonNullable<string[] | null | undefined>;

// Parameters<Type>
// 用于根据所有Type中函数类型的参数构造一个元祖类型
declare function f1(arg: { a: number; b: string }): void;
type PT0 = Parameters<() => void>;
type PT1 = Parameters<(s: string) => void>;
type PT2 = Parameters<<T>(arg: T) => T>;
type PT3 = Parameters<typeof f1>;
type PT4 = Parameters<any>;
type PT5 = Parameters<never>;
// type PT6 = Parameters<string>;
// type PT7 = Parameters<Function>;
type PT8 = Parameters<(s: string, b: number) => string>;

// ConstructorParameters<Type>
// 用于根据Type构造函数类型来构造一个元祖或数组类型，它产生一个带着所有参数类型的元组（或者返回never如果Type不是一个函数）
type CP0 = ConstructorParameters<ErrorConstructor>;
type CP1 = ConstructorParameters<FunctionConstructor>;
type CP2 = ConstructorParameters<RegExpConstructor>;
type CP3 = ConstructorParameters<any>;
// type CP4 = ConstructorParameters<Function>;

// ReturnType<Type>
// 用于构造一个含有Type函数的返回值的类型
declare function rf1(): { a: number; b: string };
type RP0 = ReturnType<() => string>;
type RP1 = ReturnType<(s: string) => void>;
type RP2 = ReturnType<<T>() => T>;
type RP3 = ReturnType<<T extends U, U extends number[]>() => T>;
type RP4 = ReturnType<typeof rf1>;
type RP5 = ReturnType<any>;
type RP6 = ReturnType<never>;
type RP7 = ReturnType<typeof String>;

// InstanceType<Type>
// 用于构造一个由所有Type的构造函数的实例类型组成的类型
class C {
  x = 0;
  y = 0;
}
type CCP0 = InstanceType<typeof C>;
type CCP1 = InstanceType<any>;
type CCP2 = InstanceType<never>;
// type CCP3 = InstanceType<string>;
// type CCP4 = InstanceType<Function>;

// ThisParameterType<Type>
// 用于提取一个函数类型Type的this (opens new window)参数类型，返回unknown (opens new window)如果这个函数类型没有this参数
function toHex(this: number) {
  return this.toString(16);
}
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// OmitThisParameter<Type>
// 用于移除一个函数类型Type的this (opens new window)参数类型。如果Type没有明确的声明this 类型，那么这个返回的结果就是Type，不然的话，就返回一个新的函数类型，基于Type，但不再有this参数。范型会被抹去，只有最后重载的签名被传播进了返回的新的函数类型
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());

// ThisType<Type>
// 这个类型不返回一个转换过的类型，它被用作标记一个上下文的this类型。注意下如果想使用这个工具类型
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let objj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

objj.x = 10;
objj.y = 20;
objj.moveBy(5, 5);
