const getList = () => {
  return new Promise((resolve, reject) => {
    var ajax = new XMLHttpRequest();
    ajax.open("get", "http://127.0.0.1:8000");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        resolve(JSON.parse(ajax.responseText));
      }
    };
  });
};

const container = document.getElementById("container");

const renderList = async () => {
  console.time("列表时间");
  const list = await getList();
  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "sunshine";
    div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
    container.appendChild(div);
  });
  console.timeEnd("列表时间");
};

const renderList2 = async () => {
  console.time("列表时间");
  const list = await getList();
  console.log(list);
  const page = 0,
    total = list.length,
    limit = 200,
    totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) {
      return;
    }
    setTimeout(() => {
      for (
        let start = page * limit, i = start, to = start + limit;
        i < to;
        ++i
      ) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "sunshine";
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    }, 0);
  };
  render(page);
  console.timeEnd("列表时间");
};

const renderList3 = async () => {
  console.time("列表时间");
  const list = await getList();
  console.log(list);
  const page = 0,
    total = list.length,
    limit = 200,
    totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) {
      return;
    }
    requestAnimationFrame(() => {
      for (
        let start = page * limit, i = start, to = start + limit;
        i < to;
        ++i
      ) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "sunshine";
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    });
  };
  render(page);
  console.timeEnd("列表时间");
};

// 使用 文档碎片 + requestAnimationFrame
const renderList4 = async () => {
  console.time("列表时间");
  const list = await getList();
  console.log(list);
  const page = 0,
    total = list.length,
    limit = 200,
    totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) {
      return;
    }
    requestAnimationFrame(() => {
      const fragment = document.createDocumentFragment();
      for (
        let start = page * limit, i = start, to = start + limit;
        i < to;
        ++i
      ) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "sunshine";
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        fragment.appendChild(div);
      }
      container.appendChild(fragment);
      render(page + 1);
    });
  };
  render(page);
  console.timeEnd("列表时间");
};

// renderList();
// renderList2();
// renderList3();
renderList4();

// [后端一次给你10万条数据，如何优雅展示](https://juejin.cn/post/7031923575044964389)
