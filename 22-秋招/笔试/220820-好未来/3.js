function sortVersions(versions = ["11.0.0", "9.99.9"]) {
  return versions
    .sort((a, b) => {
      const aSplit = a.split(".").map(Number);
      const bSplit = b.split(".").map(Number);
      for (let i = 0; i < aSplit.length; i++) {
        if (aSplit[i] > bSplit[i]) {
          return -1;
        } else if (aSplit[i] < bSplit[i]) {
          return 1;
        }
      }
      return 0;
    })
    .join(",");
}

console.log(sortVersions());
