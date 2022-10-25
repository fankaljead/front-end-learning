// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
enum Responsee {
  No = 0,
  Yes = 1,
}

enum E {
  A = Math.random(),
  B = Math.random(),
}

// 字符串枚举
enum RequestMethod {
  // computed member
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
  Patch = "PATCH",
}

// 异构枚举
enum BooleanLikeHasOwnProperty {
  No = 0,
  Yes = "YES",
}

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
}
// enum Status {
//   // enum members can be methods
//   toString = (function (): string {
//     return "FileAccess";
//   }
//   ),
//   // enum members can be overloaded
//   Equals = (function (x: FileAccess, y: FileAccess): boolean {
//     return x === y;
//   }
//   ),
//   // enum members can be generic
//   Generic = <T>(x: T, y: T): boolean {
//     return x === y;
//   }
// }

// 联合枚举
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  // kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  kind: ShapeKind.Circle,
  radius: 100,
};
