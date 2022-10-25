// 模板字面量类型 Template Literal Types
type World = "world";
type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // "welcome_email_id" | "email_heading_id" |"footer_title_id" | "footer_sendoff_id"

type Lang = "en" | "zh" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// 类型中的字符串联合类型
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
// type PropEventSource<Type> = {
//   on(
//     eventName: `${string & keyof Type}Changed`,
//     callback: (newValue: any) => void
//   ): void;
// };
// type person.on("firstNameCh2anged", (newValue) => {

//   on(
//     eventName: `${Extract<keyof Type, string>}Changed`,
//     callback: (newValue: any) => void
//   ): void;
// };
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;
person.on("ageChanged", (newAge) => {
  // (parameter) newAge: number
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

// 内置字符操作类型
// Uppercase
type Greett = "hello world";
type GREETT = Uppercase<Greett>;
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"main">;

// Lowercase
type greett = Lowercase<Greett>;

// Capitalize
type GGreett = Capitalize<Greett>;

// Uncapitalize
type gGreett = Uncapitalize<GREETT>;

function applyStringMapping(symbol: Symbol, str: string) {
  // switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
  //   case IntrinsicTypeKind.Uppercase:
  //     return str.toUpperCase();
  //   case IntrinsicTypeKind.Lowercase:
  //     return str.toLowerCase();
  //   case IntrinsicTypeKind.Capitalize:
  //     return str.charAt(0).toUpperCase() + str.slice(1);
  //   case IntrinsicTypeKind.Uncapitalize:
  //     return str.charAt(0).toLowerCase() + str.slice(1);
  // }
  return str;
}
