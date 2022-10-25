function solution(num = 3, target = 6) {
  let numb = num.toString(2);
  let tarb = target.toString(2);
  function getZO(b = "1001") {
    let [o, z] = [0, 0];
    for (const c of b) {
      if (c === "1") {
        o++;
      } else {
        z++;
      }
    }
    return [o, z];
  }

  let [a, b] = getZO(numb);
  let [c, d] = getZO(tarb);

  if (a !== c) {
    return -1;
  }

  let bb = Math.max(b, d),
    dd = Math.min(b, d);

  let count = 0;

  while (true) {
    if (bb - 3 >= dd) {
      bb -= 3;
      count++;
    } else if (bb - 2 >= dd) {
      bb -= 2;
      count++;
    } else if (bb - 1 >= dd) {
      bb -= 1;
      count++;
    }
    if (bb === dd) {
      break;
    }
  }

  return count;
}

function main() {
  const n = parseInt(readline());
  for (let i = 0; i < n; ++i) {
    const [num, target] = readline().split(" ").map(Number);
    console.log(solution(num, target));
  }
}

main();

console.log(solution());
console.log(solution(1024, 1));
console.log(solution(16, 2));
