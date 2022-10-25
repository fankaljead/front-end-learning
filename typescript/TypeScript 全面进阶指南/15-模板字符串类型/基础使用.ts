type World = "World";

type Greeting = `Hello ${World}`;

type Greet<T extends string | number | boolean | null | undefined | bigint> =
  `Hello ${T}`;
type Greet1 = Greet<"zxh">;
type Greet2 = Greet<24>;
type Greet3 = Greet<true>;
type Greet4 = Greet<null>;
type Greet5 = Greet<undefined>;
type Greet6 = Greet<0x12345>;
type Greet7 = Greet<23n>;

type Version = `${number}.${number}.${number}`;

const v1: Version = "1.0.0";
const v2: Version = "1.0";

type SKU =
  | "iphone-16G-official"
  | "xiaomi-16G-official"
  | "honor-16G-official"
  | "iphone-16G-second-hand"
  | "xiaomi-16G-second-hand"
  | "honor-16G-second-hand"
  | "iphone-64G-official"
  | "xiaomi-64G-official"
  | "honor-64G-official"
  | "iphone-64G-second-hand"
  | "xiaomi-64G-second-hand"
  | "honor-64G-second-hand";

type Brand = "iphone" | "xiaomi" | "meizu";
type Memory = "128G" | "256G";
type ItemType = "official" | "second-hand";
type SKKU = `${Brand}-${Memory}-${ItemType}`;

type SizeRecord<Size extends string> = `${Size}-Record`;
type Size = "Small" | "Middle" | "Large";
type UnionSizeRecord = SizeRecord<Size>;
