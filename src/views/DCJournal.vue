<template>
<div>
  <el-form>
    <el-form-item>
  <span style="font-size: 20px">通过导演姓名查找导演 </span>
  <el-input v-model="inputName" style="width: 200px" placeholder="请输入导演姓名"></el-input>
  <el-button @click="searchID()">查询</el-button><br>
    </el-form-item>
  </el-form>
  <el-row :gutter="10">

    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content bg-purple-light">
        <el-table
            style=""
            :data="directorList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border class="table" ref="multipleTable" header-cell-class-name="table-header">
          <el-table-column prop="director_id" label="导演ID" align="center"  min-width="30"></el-table-column>
          <el-table-column prop="director_name" label="导演姓名" align="center"></el-table-column>
          <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="70"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="getDetails(scope.row)"
              >查看详细信息</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="fy"
                       layout="prev, pager, next"
                       @current-change="current_change"
                       :total="total"
                       background
        >
        </el-pagination>
        <span>共{{directorList.length}}条搜索结果</span>
    </div>
    </el-col>

    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content bg-purple">
      <el-card>
        导演ID:{{selectedDirectorId}} 导演姓名:{{selectedDirectorName}}
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 经常合作的导演
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="directorRelation">
          <el-table-column prop="directorId" label="导演ID" align="center"  min-width="30"></el-table-column>
          <el-table-column prop="directorName" label="导演姓名" align="center"></el-table-column>
          <el-table-column prop="copTime" label="合作次数" align="center"></el-table-column>
        </el-table>
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 经常合作的演员
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="actorRelation">
          <el-table-column prop="actorId" label="演员ID" align="center"  min-width="30"></el-table-column>
          <el-table-column prop="actorName" label="演员姓名" align="center"></el-table-column>
          <el-table-column prop="copTime" label="合作次数" align="center"></el-table-column>
        </el-table>

        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 拍摄的电影
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="movieList">
          <el-table-column prop="movie_name" label="电影名" align="center">
          </el-table-column>
          <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="70"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="getMovieDetails(scope.row)">查看详细信息</el-button>
              <el-button size="small" @click="getComments(scope.row)">查看评价</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </div>
    </el-col>

  </el-row>
  <v-details
      :detailsVisible.sync="detailsVisible"
      :movieImage.sync="movieImage"
      :movieDetails.sync="movieDetails"
  ></v-details>
  <v-comment
      :commentVisible.sync="commentVisible"
      :commentList.sync="commentList"
  ></v-comment>
</div>
</template>

<script>
import vComment from "../components/CommentDialog";
import vDetails from "../components/DetailsDialog";
export default {
  name: "PeopleSearch",
  components:{
    vComment,
    vDetails
  },
  data()
  {
    return{
      total:1000,//默认数据总数
      pagesize:15,//每页的数据条数
      currentPage:1,//默认开始页面

      inputName:"jack",
      directorList:[],

      selectedDirectorId:"",
      selectedDirectorName:"",
      directorRelation:[],
      actorRelation:[],

      movies:[],
      movieList:[],


      asin:'',
      detailsVisible:false,
      movieImage:{'url':''},
      movieDetails:{
        'dateTime':{
          'year':'','month':'','day':''
        }
      },

      commentList:[],
      commentVisible:false,

    }
  },
  created() {
    this.getDirID()
  },
  methods:{
    getComments(row){
      if(this.commentList!=[]) {
        let str=row.movie_name.replaceAll(' ','%20')
        str=str.replaceAll('&','%26')
        getByTitle(str).then(
            response=>{
              this.asin=response.data[0].asin
              this.movieImage.url=response.data[0].moviePic
              console.log(this.asin,this.movieImage.url)
              getByAsin(this.asin).then(
                  response=>{
                    this.movieDetails=response.data
                    this.movieDetails.actorsName=this.movieDetails.actorsName.replace('$',', ')
                    this.movieDetails.productVersion=this.movieDetails.productVersion.replace('$',', ')
                    this.commentList=this.movieDetails.divReviewEntityList
                    console.log(response.data)
                    console.log(this.commentList)
                  }
              )
            }
        )
      }
      this.commentVisible=true
    },
    getMovieDetails(row) {
      let str=row.movie_name.replaceAll(' ','%20')
      str=str.replaceAll('&','%26')
      getByTitle(str).then(
          response=>{
            this.asin=response.data[0].asin
            this.movieImage.url=response.data[0].moviePic
            console.log(this.asin,this.movieImage.url)
            getByAsin(this.asin).then(
                response=>{
                  this.movieDetails=response.data
                  this.movieDetails.actorsName=this.movieDetails.actorsName.replace('$',', ')
                  this.movieDetails.productVersion=this.movieDetails.productVersion.replace('$',', ')
                  this.commentList=this.movieDetails.divReviewEntityList
                  console.log(response.data)
                  console.log(this.commentList)
                }
            )
          }
      )
      this.detailsVisible=true
    },

    current_change(currentPage){
      this.currentPage = currentPage;
    },
    searchID() {
      if(this.inputName==""){
        this.$message.warning("请输入导演姓名")
        return
      }
      this.getDirID()
    },
    getDirID(){
      getDirectorId(this.inputName).then(
          response=>{
            this.directorList=response.data;
            console.log(this.directorList)
          }
      )
    },
    getDetails(row){
      console.log(row.director_id)
      this.selectedDirectorId=row.director_id
      this.selectedDirectorName=row.director_name
      getDirectorRelation(row.director_id).then(
          response=>{
            this.directorRelation=response.data
            console.log(this.directorRelation)
          }
      )
      getDirectorActorRelation(row.director_id).then(
          response=>{
            this.actorRelation=response.data
            console.log(this.actorRelation)
          }
      )
      getDirectorMovie(row.director_id).then(
          response=>{
            this.movies=response.data
            this.movies=this.movies[0].movie_name.split('$')
            for(let i=0;i<this.movies.length;i++) {
              this.movieList.push(
                  {"id":1,"movie_name":this.movies[i]}
              )
            }
            console.log(this.movies)
          }
      )


    }

  }
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
