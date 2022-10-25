const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = "zxh";
const tmp5: Object = 55;
const tmp6: Object = { name: "zxh" };
const tmp7: Object = () => {};
const tmp8: Object = [];

const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = "zxh"; // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: "linbudu" };
const tmp23: object = () => {};
const tmp24: object = [];

declare const tmp25: Record<string, unknown>;
declare const tmp26: Record<string, any>;
declare const tmp27: (...args: any[]) => any;
