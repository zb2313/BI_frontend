<template>
  <div class="about">
<el-card  style="width: 1100px;margin: 0 auto"><Statistics></Statistics></el-card><br>
  </div>
</template>
<script>
import Statistics from "./Statistics";
export default {
  components: {
    Statistics,
  },
  data(){
    return{
      tagsList:[],
      collapse:false
    }
  },
  created(){
  }

};
</script>
