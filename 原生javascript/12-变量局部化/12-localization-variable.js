var i,
  str = "";

function packageDom() {
  for (i = 0; i < 1000; i++) {
    str += i;
  }
}

packageDom();

function packageDom() {
  let str = "";
  for (let i = 0; i < 1000; i++) {
    str += i;
  }
}

packageDom();
