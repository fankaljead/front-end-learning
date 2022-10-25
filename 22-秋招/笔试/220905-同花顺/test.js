function toUppercase(str = "") {
  return str.toUpperCase();
}

function birthDate(m, d) {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var date = today.getDate();

  var byear = year;
  //计算今年生日是否过完，过完就算明年生日了
  if (m < month) {
    byear++;
  } else if (m == month || d <= date) {
    byear++;
  }

  var brthday = new Date(byear + "-" + m + "-" + d);

  //核心，两个日期相减，得到一个整数，是两个日期之间相差的毫秒数
  var dms = brthday - today;
  //毫秒除以1000得到秒，除以3600得到小时，除以24得到日
  var dday = Math.round(dms / (1000 * 3600 * 24));
  return dday;
}

console.log(brthDate(5, 21));
