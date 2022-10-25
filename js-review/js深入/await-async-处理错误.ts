export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

// 使用
// const handleLogin = async () => {
//   const [resErr, res] = await to(
//     fetch("/basic/login", {
//       usename: "sunshine",
//       password: "123456",
//     })
//   );
//   if (resErr) {
//     // fail do somthing
//     return;
//   }
//   const [userErr, info] = await to(
//     fetch("/basic/getuserinfo", {
//       id: res.id,
//     })
//   );
//   if (userErr) {
//     // fail do somthing
//     return;
//   }
//   this.userInfo = info;
// };
