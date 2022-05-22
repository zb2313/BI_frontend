<template>
<div>
  <el-dialog title="电影详细信息"
             :visible="detailsVisible"
             width="900px"
             >
    <el-button @click="closeDialog">关闭</el-button>
    <el-form ref="login" label-width="80px" class="ms-content">

      <el-row :gutter="10">
        <el-col :xs="4" :sm=6 :md="8" :lg="9" :xl="8">
          <div class="grid-content bg-purple-light">
            <img style="float: right" :src="movieImage.url">
          </div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" style="float: right">
          <el-card style="width:350px;">
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
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "DetailsDialog",
  data(){
    return{
    }
  },
  props:{
      movieImage:{
        'url':''
      },
      detailsVisible:Boolean,
      movieDetails:{
      'dateTime':{
        'year':'','month':'','day':''
        }
      },
  },
  methods:{
      closeDialog(){
        //this.detailsVisible=false
        this.$emit(`update:detailsVisible`,false)
        this.$emit(`update:movieImage`,{'url':''})
        this.$emit(`update:movieDetails`,{
          'dateTime':{
            'year':'','month':'','day':''
          }
        })

      }
  },
  watch:{
  }
}
</script>

<style scoped>

</style>
