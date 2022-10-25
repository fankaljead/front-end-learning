function sortDates(
  dates = [
    "20 Oct 2010",
    "10 Oct 2010",
    "30 Oct 2010",
    "10 Oct 2010",
    "20 Oct 2010",
    "20 May 2010",
  ]
) {
  return dates.sort((a, b) => {
    const da = new Date(a);
    const db = new Date(b);
    return da - db;
  });
}

console.log(sortDates());
