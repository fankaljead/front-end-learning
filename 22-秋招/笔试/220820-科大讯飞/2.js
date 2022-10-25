function signalVerify(signal) {
  let s1 = signal.split("=")[0];
  let s2 = signal.split("=")[1];
  let r1 = /^[a-z]$/g;
  let r2 = /^([a-z\d])([a-z\d\s])*$/g;

  return r1.test(s1) && r2.test(s2);
}
