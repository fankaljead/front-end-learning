const uniqueSymbolFoo: unique symbol = Symbol("foo");
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo;

declare const uniqueSymbolFooo: unique symbol;
const uniqueSymbolBaz: typeof uniqueSymbolFooo = uniqueSymbolFooo;
