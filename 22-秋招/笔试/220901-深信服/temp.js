const shape = {
  r: 10,
  d() {
    return this.r * 2;
  },
  p: () => 20 * this.r,
};

shape.d();
shape.p();
