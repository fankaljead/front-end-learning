type USDD = number;
type CNYY = number;

const CCCNYCount: CNYY = 200;
const UUUSDCount: USDD = 299;

function addCCCNY(source: CNYY, input: CNYY) {
  return source + input;
}

addCCCNY(CCCNYCount, UUUSDCount);

class Catl {}
class ShorthairCat extends Cat {}

declare class TagProtectorr<T extends string> {
  protected __tag__: T;
}

type Nominald<T, U extends string> = T & TagProtectorr<U>;

type UUSD = Nominald<number, "USD">;
type CCNY = Nominald<number, "CNY">;

const CCNYCount = 200 as CCNY;
const UUSDCount = 299 as UUSD;

function addCCNY(source: CCNY, input: CCNY) {
  return source + input;
}

addCCNY(CCCNYCount, UUUSDCount);
