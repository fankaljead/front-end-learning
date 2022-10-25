interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2);
}

interface Tmp2 {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp2;
if (tmp.user.vip) {
  console.log(tmp.user.expires);
} else {
  console.log(tmp.user.promotion);
}

type Code = 10000 | 10001 | 50000;

type Status = "success" | "failure";

// 对象字面量类型
interface Tmp3 {
  obj: {
    name: "zxh";
    age: 18;
  };
}

const tmp3: Tmp3 = {
  obj: {
    name: "zxh",
    age: 18,
  },
};
