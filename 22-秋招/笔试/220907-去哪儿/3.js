let items = [];
let result = {
  odd: 0,
  even: 0,
};
for (var i = 0; i < 100000; i++) items[i] = i;

function process(item) {
  let r = item % 2;
  if (r > 0) {
    result.odd = result.odd++;
  } else {
    result.even = result.even++;
  }
}

function callback() {
  console.log("done");
}

function processList(n = 100000) {
  const total = n;
  const page = 0,
    limit = 100;

  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page > totalPage) {
      setTimeout(() => {
        for (let i = page * limit; i < page * limit + limit; ++i) {
          const item = list[i];
          process(item);
        }
      });
      render(page + 1);
    }
  };

  render(page);
}

processList(n);
callback();
