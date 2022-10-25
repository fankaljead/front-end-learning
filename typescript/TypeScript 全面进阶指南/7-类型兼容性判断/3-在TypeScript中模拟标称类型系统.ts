declare class TagProtector<T extends string> {
  protected __tag__: T;
}

type Nominal<T, U extends string> = T & TagProtectorr<U>;

type CNY = Nominald<number, "CNY">;
type USD = Nominald<number, "USD">;

const CNYCount = 100 as CNYY;
const USDCount = 200 as USDD;

function addCNY(source: CNYY, input: CNYY) {
  return (source + input) as CNYY;
}

addCNY(CCCNYCount, CCCNYCount);
addCNY(CCCNYCount, UUUSDCount);

declare const tag: unique symbol;
declare type Tagged<Token> = {
  readonly [tag]: Token;
};

type Opaque<Type, Token = unknown> = Type & Tagged<Token>;
