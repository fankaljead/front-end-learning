type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str;

type ReversedTomHardy = ReverseName<"Tom hardy">;
type ReversedZxh = ReverseName<"Zhou Xianghui">;

declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;

handler(`Guess who is zxh`);
handler(`Guess who is `);
handler(`Guess who was `);
handler(``);
