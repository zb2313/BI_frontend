<template>
<div>
<el-row :gutter="5">
  <el-col :span="12">
  <el-button @click="getDAInfoN">导演与演员合作次数排行</el-button>
  <el-button @click="getAAInfoN">演员与演员合作次数排行</el-button>
  <el-button @click="getDDInfoN">导演与导演合作次数排行</el-button>
  <span>请求响应时间 {{timeN}}s</span>
  <el-card style="width: 750px;">
    <span>neo4j</span>
  <el-table :data="relationListN"
            style="width: 500px;margin: 0 auto">
    <el-table-column prop="bname" label="a"></el-table-column>
    <el-table-column prop="rnum" label="次数"></el-table-column>
    <el-table-column prop="aname" label="b"></el-table-column>
  </el-table>
  </el-card>
  </el-col>

  <el-col :span="12">

    <el-button @click="getDAInfoM">导演与演员合作次数排行</el-button>
    <el-button @click="getAAInfoM">演员与演员合作次数排行</el-button>
    <el-button @click="getDDInfoM">导演与导演合作次数排行</el-button>
    <span>请求响应时间 {{timeM}}s</span>
    <el-card style="width: 720px;">
      <span>mysql</span>
      <el-table :data="relationListM"
                style="width: 500px;margin: 0 auto">
        <el-table-column prop="bname" label="a"></el-table-column>
        <el-table-column prop="rnum" label="次数"></el-table-column>
        <el-table-column prop="aname" label="b"></el-table-column>
      </el-table>
    </el-card>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  name: "Cooperation",
  data(){
    return{
      relationListN:[],
      relationListM:[],
      timeN:"",
      timeM:""
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
