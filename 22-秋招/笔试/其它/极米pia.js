// https://ac.nowcoder.com/acm/contest/view-submission?submissionId=53297990

const readline = readline || read_line;
const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};
const readInt = () => {
  return parseInt(readline());
};

function main() {
  const T = readInt();
  // const T = 1;

  let res = "";
  function solution(P = 103, Q = 24) {
    if (P % Q === 0) {
      res += Math.floor(P / Q).toString();
      return;
    }
    res += Math.floor(P / Q).toString() + "+1/";

    let r = Q % (P % Q);
    if (r > 0) {
      res += "{";
    }

    solution(Q, P % Q);

    if (r > 0) {
      res += "}";
    }
  }

  for (let i = 0; i < T; ++i) {
    // const [P, Q] = [4, 2];
    const [P, Q] = readArray();
    res = `${P}/${Q} = `;
    solution(P, Q);
    console.log(res);
    res = "";
  }
}
main();
