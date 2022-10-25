<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world! This is not a joke",
    };
  },
};
</script>

<style lang="less" scoped>
.example {
  color: blueviolet;
  font-size: 50px;
}
</style>
