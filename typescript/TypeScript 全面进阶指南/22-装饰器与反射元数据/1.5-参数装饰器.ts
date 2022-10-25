function CheckParam(): ParameterDecorator {
  return (target, paramIdentifier, index) => {
    console.log(target, paramIdentifier, index);
  };
}

class Faa {
  handler(@CheckParam() input: string) {
    console.log(input);
  }
}

const faa = new Faa();
faa.handler("zxh");
