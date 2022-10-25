// 模块 modules
// 模块是一个独立的文件，可以包含多个模块，模块内部可以包含多个函数和变量
// 模块的名称是以文件名的后缀命名的，如果模块名称为index.ts，则模块的名称就是index

// 导出
// 在模块中可以使用export关键字导出变量和函数
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出

// 导入
// 在其他模块中使用import关键字导入模块中的变量和函数
import { ZipCodeValidator as ZCV} from "./8-模块/ZipCodeValidator";
let myValidator = new ZCV();

// 默认导出
// 在模块中可以使用 export default关键字导出变量和函数
