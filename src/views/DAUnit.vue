<template>
<div>

  <el-radio v-model="searchType" label=1>年月日查询</el-radio>
  <el-radio v-model="searchType" label=2>季度查询</el-radio>

  <el-card v-if="searchType==1" style="width: 300px" >
  <el-checkbox-group  v-model="checkedYMD">
    <el-checkbox v-for="city in ymdOptions" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
  </el-card>

  <el-card v-if="searchType==2" style="width: 300px">
    <el-checkbox-group  v-model="checkedYQ">
      <el-checkbox v-for="city in yqOptions" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </el-card>


  <div style="text-align: center">
    <el-button  @click="submitRequest()">查询</el-button>
  <el-select v-if="quarSelected=checkedYQ.includes('quarter')" v-model="quarter" placeholder="请选择季度" >
    <el-option
        v-for="item in quarterOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
  <el-select v-if="daySelected=checkedYMD.includes('day')&&searchType==1" v-model="day" placeholder="请选择日期">
    <el-option
        v-for="item in dayOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
  <el-select v-if="monthSelected=checkedYMD.includes('month')&&searchType==1" v-model="month" placeholder="请选择月份">
      <el-option
          v-for="item in monthOptinos"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
  </el-select>
  <el-input style="width: 200px" v-if="yearSelected=checkedYMD.includes('year')||checkedYQ.includes('year')" v-model="year" placeholder="请输入年份" ></el-input>
  </div>

  <div class="container" style="margin-top: 10px">
    <el-table
        :data="dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="asin" label="ASIN" align="center"  min-width="30"></el-table-column>
      <el-table-column prop="title" label="电影名" align="center"></el-table-column>
      <el-table-column prop="directorsName" label="导演" align="center">
      </el-table-column>
      <el-table-column prop="imdbScore" label="IMDB评分" align="center"></el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作"
          min-width="70"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="getDetails(scope.row)">查看详细信息</el-button>
          <el-button size="small" @click="getComments(scope.row)">查看评价</el-button>
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
    <span>共{{dataList.length}}条搜索结果</span>
  </div>

  <v-details
      :detailsVisible.sync="detailsVisible"
      :movieImage.sync="movieImage"
      :movieDetails.sync="movieDetails"
  >
  </v-details>
  <v-comments
      :commentVisible.sync="commentVisible"
      :commentList.sync="commentList"
  ></v-comments>
</div>
</template>

<script>
import vDetails from "../components/DetailsDialog.vue";
import vComments from "../components/CommentDialog.vue"
export default {
  name: "DateSearch",
  components:{
    vDetails,
    vComments
  },
  data()
  {
    return{
      detailsVisible:false,

      total:1000,//默认数据总数
      pagesize:15,//每页的数据条数
      currentPage:1,//默认开始页面

      dataList:[],//电影列表

      dayOptions:[],//选择的日
      monthOptinos:[],//可选月
      quarterOptions:[],
      day:'',
      daySelected:false,
      year:2000,
      yearSelected:true,
      month:'',
      monthSelected:false,
      quarter:'',
      quarterSelected:false,

      searchType:1,//查找方式 年月日还是季度

      checkAll: false,
      checkedYMD: [],
      checkedYQ:[],
      ymdOptions : ['year', 'month', 'day'],
      yqOptions:['year','quarter'],

      isIndeterminate: true,

      movieImage:"",
      movieDetails:{
        'dateTime':{
          'year':'','month':'','day':''
        }
      },

      commentList:[],
      commentVisible:false
    }
  },
  created() {
    for(let i=1;i<=31;i++)
    {
      this.dayOptions.push({value:i,label:i.toString()})
    }
    this.monthOptinos=this.dayOptions.slice(0,12)
    this.quarterOptions=this.dayOptions.slice(0,4)
    this.submitRequest()
  },
  methods:{
    closeDetails()
    {
      this.detailsVisible=false
      this.movieDetails={
        'dateTime':{
          'year':'','month':'','day':''
        }
      }
      this.movieImage=""
    },

    submitRequest()
    {
      if(this.searchType==1)
      {
        if(this.yearSelected==false&&this.monthSelected==false&&this.daySelected==true) {
           this.getMovieByDay(this.day)
           console.log('byday')
        }
        else if(this.yearSelected==false&&this.monthSelected==true&&this.daySelected==false) {
           this.getMovieByMonth(this.month)
        }
        else if(this.yearSelected==true&&this.monthSelected==false&&this.daySelected==false) {
           this.getMovieByYear(this.year)
        }
        else if(this.yearSelected==false&&this.monthSelected==true&&this.daySelected==true) {
           this.getMovieByMD(this.month,this.day)
        }
        else if(this.yearSelected==true&&this.monthSelected==true&&this.daySelected==false) {
           this.getMovieByYM(this.year,this.month)
        }
        else if(this.yearSelected==true&&this.monthSelected==true&&this.daySelected==true) {
           this.getMovieByYMD(this.year,this.month,this.day)
        }
      }
      else
      {
        if(this.yearSelected==false&&this.quarter==true) {
            this.getMovieByQuarter(this.year,this.quarter)
        }
        else if(this.yearSelected==true&&this.quarterSelected==false) {
            this.getMovieByYear(this.year,this.quarter)
        }
        else if(this.yearSelected==true&&this.quarterSelected==true) {
            this.getMovieByYQ(this.year,this.quarter)
        }
      }

    },
    peopleEdit()
    {

    },
    current_change(currentPage){
      this.currentPage = currentPage;
    },
    getMovieByDay(day)
    {
       if(day=='')
       {
         this.$message.error("请选择日期")
       }

    },
    getMovieByMonth(month)
    {
      if(month=='')
      {
        this.$message.error("请选择日期")
      }

    },
    getMovieByYear(year)
    {
      if(year=='')
      {
        this.$message.error("请选择日期")
      }

    },
    getMovieByQuarter(quarter)
    {
      if(quarter=='')
      {
        this.$message.error("请选择日期")
      }

    },

  }
}
</script>

<style scoped>
.fl{
  float: right;
  margin-right:20px;
}
.fy{
  text-align:center;
  margin-top:30px;
}
.title{
  height:100%;
}
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
