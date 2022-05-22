<template>
<div>
  <el-dialog title="电影评价"
             :visible="commentVisible"
             width="840px"
  >
    <el-button @click="closeDialog">关闭</el-button>
  <ul>
    <li v-for="(item,index) in commentList" :key="index">
      <el-card :data="item">
        <span style="font-style: italic;font-size: 20px">{{item.summary}}</span><br>
        <span style="font-size: 16px">{{item.reviewerName}}:</span>
        <div>
        {{item.text}}<br>
        {{item.date}}<br>
        <span style="font-style: oblique;font-size: 14px">feelings:{{item.sentiment}} score:{{item.score}} helpfulNum:{{item.helpfulNum}}</span>
        </div>
      </el-card>
    </li>
  </ul>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "CommentDialog",
  data(){
    return{
    }
  },
  props:{
    commentVisible:Boolean,
    commentList:Array
  },
  methods:{
    closeDialog(){
      //this.detailsVisible=false
      this.$emit(`update:commentVisible`,false)
    }
  },
  watch:{
  }
}
</script>

<style scoped>

</style>
