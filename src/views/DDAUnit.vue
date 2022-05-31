<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "PeopleSearch",
  components:{
  },
  data()
  {
    return{
      total:1000,//默认数据总数
      pagesize:15,//每页的数据条数
      currentPage:1,//默认开始页面

      inputName:"jack",
      actorList:[],

      selectedActorId:"",
      selectedActorName:"",
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
    this.getActorID()
  },
  methods:{

    getComments(row){
      if(this.commentList!=[]) {
        let str=row.movie_name.replaceAll(' ','%20')
        str=str.replaceAll('&','%26')
      }
      this.commentVisible=true
    },
    getMovieDetails(row) {
      let str=row.movie_name.replaceAll(' ','%20')
      str=str.replaceAll('&','%26')
      this.detailsVisible=true
    },

    current_change(currentPage){
      this.currentPage = currentPage;
    },
    searchID() {
      if(this.inputName==""){
        this.$message.warning("请输入演员姓名")
        return
      }
      this.getActorID()
    },
    getActorID(){
    },
    getDetails(row){
      console.log(row.actor_id)
      this.selectedActorId=row.actor_id
      this.selectedActorName=row.actor_name

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
