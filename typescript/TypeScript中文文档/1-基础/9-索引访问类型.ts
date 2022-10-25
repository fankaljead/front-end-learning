// 可以使用 索引访问类型（indexed access type） 查找另外一个类型上的特定属性
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type I1 = Person["age" | "name"]; // "age" | "name"
type I2 = Person[keyof Person]; // "age" | "name" | "alive"
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // "alive" | "name"

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person1 = typeof MyArray[number];
type Agee = typeof MyArray[number]["age"];
type Ageee = Person["age"];

// 作为索引的只能是类型，这意味着你不能使用 const 创建一个变量引用
// const key = "age";
// type Age = Person[key];
// 可以使用类型别名实现类似的重构
type key = "age";
type Aged = Person[key];

// 实战
// const APP = ['TaoBao', 'Tmall', 'Alipay'];
// type app = 'TaoBao' | 'Tmall' | 'Alipay';
const APP = ["TaoBao", "Tmall", "Alipay"] as const;
type app = typeof APP[number];
