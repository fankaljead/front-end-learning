function solution(str = "101") {
  let zeor = 0,
    one = 0;
  str.split("").forEach((ch) => {
    if (ch === "1") {
      zeor++;
    } else {
      one++;
    }
  });

  if (zeor & 1 && one & 1) {
    console.log("No");
  } else {
    console.log("Yes");
  }
}

function main() {
  const n = parseInt(readline());
  for (let i = 0; i < n; ++i) {
    solution(readline());
  }
}

main();
