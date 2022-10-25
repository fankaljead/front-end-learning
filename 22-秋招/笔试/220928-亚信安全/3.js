function output(str) {
  let content = document.querySelector(".content");
  let childArr = Array.from(content.children);
  let jsBlink = document.getElementById("jsBlink");

  childArr.pop();
  childArr.forEach((el) => {
    content.removeChild(el);
  });

  let i = 0;
  let timerId = setInterval(() => {
    if (i < Array.from(str).length) {
      let el = Array.from(str)[i];
      let color = "color" + Math.floor(Math.random() * 24 + 1);
      let span = document.createElement("span");
      span.className = "word " + color;

      if (/\n/.test(el)) {
        span = document.createElement("br");
        span.className = "";
      } else if (/</.test(el)) {
        span.innerHTML = "&lt;";
      } else if (/>/.test(el)) {
        span.innerHTML = "&gt;";
      } else if (/\s/.test(el)) {
        span.innerHTML = "&nbsp;";
      } else {
        span.innerHTML = el;
      }
      content.insertBefore(span, jsBlink);
      i++;
    } else {
      clearInterval(timerId);
    }
  }, 200);
}

output("hello world\n你好世界");
