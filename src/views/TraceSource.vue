<template>
<div>
  <span style="color: #2d8cf0">电影模糊搜索 请输入电影名</span>
  <el-input v-model="inputName" style="width: 500px" placeholder="请输入电影名称"></el-input>
  <el-button @click="searchByTitle">查询</el-button>
  <el-table :data="movies">
    <el-table-column prop="asin" label="asin"></el-table-column>
    <el-table-column prop="title" label="电影名"></el-table-column>
    <el-table-column prop="actorsName" label="演员"></el-table-column>
    <el-table-column prop="imdbScore" label="imdb评分" style="width: 30px"></el-table-column>
  </el-table><br><br>


  <span style="color: #2d8cf0">通过asin查询系列信息 请输入asin</span>
  <el-input v-model="inputAsin" style="width: 500px" placeholder="请输入电影asin"></el-input>
  <el-button @click="searchByAsin">查询</el-button><br>
  <el-card style="width: 1000px">所属于的电影系列ID：{{ seriesInfo.movieSeriesId }}； 该系列含有电影数目：{{seriesInfo.seriesNum}} </el-card><br><br>

  <span style="color: #2d8cf0">通过seriesId查询系列信息 请输入seriesId</span>
  <el-input v-model="inputSeries" style="width: 500px" placeholder="请输入电影asin"></el-input>
  <el-button @click="searchBySeries">查询</el-button><br>
  <el-table :data="seriesMovies">
    <el-table-column prop="asin" label="asin"></el-table-column>
    <el-table-column prop="title" label="title"></el-table-column>
    <el-table-column prop="directorsName" label="导演"></el-table-column>
    <el-table-column prop="actorsName" label="演员"></el-table-column>
    <el-table-column prop="imdbScore" label="imdb评分"></el-table-column>

  </el-table>

</div>
</template>

<script>
export default {
  name: "TraceSource",
  data(){
    return{
      inputName:"harry potter",
      movies:[],

      inputAsin:"B00005JMAH",
      seriesInfo:"",

      inputSeries:"94628",
      seriesMovies:[]
    }
  },
  created() {
    this.searchByTitle()
    this.searchByAsin()
    this.searchBySeries()
  },
  methods:{
    searchBySeries(){

    },
    searchByTitle(){
      if(this.inputName==""){
        this.$message.warning("请输入影片名")
        return
      }

    },
    searchByAsin(){
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 1000px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
