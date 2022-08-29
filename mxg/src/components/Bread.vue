<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-card>
      <span class="wire">|</span><span>{{ name }}</span>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    this.name = this.$route.meta[0];
    // console.log(this.$route.meta)
  },
};
</script>

<style>
.wire {
  /* font-size: 30px; */
  color: aqua;
  margin-right: 20px;
}
.el-card {
  margin-bottom: 20px;
}
</style>