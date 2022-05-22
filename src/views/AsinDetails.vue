<template>
<div>
  <el-form ref="login" label-width="80px" class="ms-content">
    根据asin查询电影详细信息和评论 <el-input style="width: 300px" v-model="inputAsin" placeholder="请输入asin"></el-input>
    <el-button @click="getDetails">查询</el-button>
    <el-row :gutter="10">
      <el-col :xs="4" :sm=6 :md="8" :lg="9" :xl="8">
        <div class="grid-content bg-purple-light">
          <br><br>
          <img style="float: right" :src="movieImage.url">
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" style="float: right">
        <el-card style="width:500px;">
          <el-form :data="movieDetails">
            <el-form-item>asin：{{movieDetails.asin}}</el-form-item>
            <el-form-item>电影名称：{{movieDetails.title}}</el-form-item>
            <el-form-item>演员：{{movieDetails.actorsName}}</el-form-item>
            <el-form-item>导演：{{movieDetails.directorsName}}</el-form-item>
            <el-form-item>上映时间：{{movieDetails.dateTime.year}}/{{movieDetails.dateTime.month}}/{{movieDetails.dateTime.day}}</el-form-item>
            <el-form-item>imdb评分：{{movieDetails.imdbScore}}</el-form-item>
            <el-form-item>版本：{{movieDetails.productVersion}}</el-form-item>
            <el-form-item>风格：{{movieDetails.styleName}}</el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
  <ul>
    <li v-for="(item,index) in commentList" :key="index">
      <el-card :data="item">
        <span style="font-style: italic;font-size: 20px">{{item.summary}}</span><br>
        <span style="font-size: 16px;color: blue">{{item.reviewerName}}:</span>
        <div>
          {{item.text}}<br>
          {{item.date}}<br>
          <span style="font-style: oblique;font-size: 14px;color: #f56c6c">feelings:{{item.sentiment}} score:{{item.score}} helpfulNum:{{item.helpfulNum}}</span>
        </div>
      </el-card>
    </li>
  </ul>

</div>
</template>

<script>
export default {
  name: "AsinDetails",
  data() {
    return {
      inputAsin: "B00005JMAH",
      movieImage: {
        'url': ''
      },
      movieDetails: {
        'dateTime': {
          'year': '', 'month': '', 'day': ''
        }
      },
      commentList:[]
    }
  },
  created() {
    this.getDetails()
  },
  methods:{
     getDetails(){
     }
  }
}
</script>

<style scoped>

</style>
