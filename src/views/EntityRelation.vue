<template>
<div>
<div>
  <el-select v-model="searchType" placeholder="请选择" style="width: 200px">
    <el-option
        v-for="item in types"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
  <el-input v-model="index1" style="width: 200px"></el-input>
  <el-input v-model="index2" style="width: 200px"></el-input>
  <el-button @click="setData()">加载数据</el-button>
  <el-button @click="drawChart()">绘图</el-button><br>
  //a-a: 483740 749049
  //a-p: 26875 1001135
  //p-p: 1396322 1396323
  <div id="main" style="width: 100%;height:600px;"></div>
</div>
</div>
</template>

<script>
import {relateBetweenAuthor,
  relateBetweenPaperAuthor,
relateBetweenPaper} from "../api/relation";

export default {
  name: "EntityRelation",
  data(){
    return{
      index1:"",
      index2:"",
      //a-a: 483740 749049
      //a-p: 26875 1001135
      //p-p: 1396322 1396323
      types:[
        {
          value:1,
          label:"author and author"
        },
        {
          value:2,
          label:"author and paper"
        },
        {
          value:3,
          label:"paper ande paper"
        }
      ],
      searchType:"",
      dt:[]
    }
  },
  methods:{
    setData(){
      if(this.searchType==1) {
         relateBetweenAuthor(this.index1,this.index2).then(
             res=>{
               this.$message.success("成功加载")
               this.dt=res.data
               for (let i = 0; i < this.dt.data.length; i++) {
                 this.dt.data[i].category = Number(this.dt.data[i].category)
               }
               for (let i = 0; i < this.dt.links.length; i++) {
                 this.dt.links[i].label = {
                   show: true,
                   formatter: function (params) {
                     return `${params.data.type}`;
                   }
                 }
                 this.dt.links[i].tooltip ={ show: false }
               }
               console.log("data",this.dt.data)
               console.log("links",this.dt.links)
             }
         )
      }
      else if(this.searchType==2) {
         relateBetweenPaperAuthor(this.index1,this.index2).then(
             res=>{
               this.$message.success("成功加载")
               this.dt=res.data
               for (let i = 0; i < this.dt.data.length; i++) {
                 this.dt.data[i].category = Number(this.dt.data[i].category)
               }
               for (let i = 0; i < this.dt.links.length; i++) {
                 this.dt.links[i].label = {
                   show: true,
                   formatter: function (params) {
                     return `${params.data.type}`;
                   }
                 }
                 this.dt.links[i].tooltip ={ show: false }
               }
               console.log("data",this.dt.data)
               console.log("links",this.dt.links)
             }
         )
      }
      else {
         relateBetweenPaper(this.index1,this.index2).then(
             res=>{
               this.$message.success("成功加载")
               this.dt=res.data
               for (let i = 0; i < this.dt.data.length; i++) {
                 this.dt.data[i].category = Number(this.dt.data[i].category)
               }
               for (let i = 0; i < this.dt.links.length; i++) {
                 this.dt.links[i].label = {
                   show: true,
                   formatter: function (params) {
                     return `${params.data.type}`;
                   }
                 }
                 this.dt.links[i].tooltip ={ show: false }
               }
               console.log("data",this.dt.data)
               console.log("links",this.dt.links)
             }
         )
      }
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'))
      // 绘制图表
      let option = {
        title: {
          text: 'Basic Graph'
        },
        tooltip: {},
        legend:{},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
              formatter: function (params) {
                const item = params;
                if(item.data.category==0){
                  return `${item.data.title.slice(0,5)+"..."}`

                }
                return `${item.data.truename.slice(0,5)+"..."}`;
              }
            },
            tooltip: {
              formatter: function (params) {
                const item = params.data;
                let temStr = "";
                // 写个外部函数来获取名称， 把节点相关字段全部显示
                if (typeof item.truename != 'undefined'&&item.category==1) {
                  temStr += `作者名称：${item.truename}<br/>`;
                }
                if(typeof item.referenceCount != 'undefined'){
                  temStr += `被引用次数：${item.referenceCount}<br/>`;
                }
                if (typeof item.truename != 'undefined'&&item.category==3) {
                  temStr += `研究机构：${item.truename}<br/>`;
                }
                if (item.category==0) {
                  temStr += `标题：${item.title}<br/>`;
                }
                if (item.category==4) {
                  temStr += `会议或期刊：${item.truename}<br/>`;
                }
                if (item.category==2) {
                  temStr += `研究方向：${item.truename}<br/>`;
                }
                return temStr;
              }
            },
            force: {
              repulsion: [1000, 20000],
              friction: 0.1
            },
            draggable: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 14
            },
            data: this.dt.data,
            links: this.dt.links,
            categories: [
              {
                name: 'paper',
                symbolSize: 30
              },
              {
                name: 'author',
                symbolSize: 100
              },
              {
                name: 'interest'
              },
              {
                name: 'affiliation',
                symbol: 'roundRect',
                symbolSize: 100
              },
              {
                name: 'venue',
                symbolSize: 100
              }
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      };
      myChart.setOption(option, true);
    },
  }
}
</script>

<style scoped>

</style>
