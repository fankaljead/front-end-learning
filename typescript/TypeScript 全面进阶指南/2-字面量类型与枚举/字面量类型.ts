// 字面量类型
interface Res {
  code: 10000 | 10001 | 5000;
  status: "success" | "failure";
  data: any;
}

declare var res: Res;
if (res.status === "failure") {
}

const str: "zxh" = "zxh";
const num: 599 = 599;
const bool: true = true;

interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "lin" | "bu" | "du";
}
