function ModifyNickName(): PropertyDecorator {
  return (target: any, propertyIdentifier) => {
    target[propertyIdentifier] = "zxh";
    target["otherName"] = "fankaljead";
  };
}

class Bax {
  @ModifyNickName()
  nickName!: string;
  constructor() {}
}

console.log(new Bax().nickName);
// @ts-expect-error
console.log(new Bax().otherName);
