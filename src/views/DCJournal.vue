<template>
  <div>
    <el-input v-model="interest" style="width: 300px"></el-input>
    <el-input v-model="count" style="width: 100px" placeholder="查询个数"></el-input>
    <el-button @click="getKeyJournal">查询</el-button>
    <div id="main" style="width: 100%;height:800px;"></div>
  </div>
</template>

<script>
import {keyJournal} from "../api/domain";

export default {
  name: "DCJournal",
  components:{

  },
  data()
  {
    return{
      interest:"",
      keyvenues:[],
      count:10


    }
  },
  mounted() {
  },
  methods:{
    drawChart()
    {
      let dt=this.setData()
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'domain search',
          subtext: 'key venue',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          top: '50',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: dt,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    setData()
    {
      let dt =[

      ]
      for(let i=0;i<this.keyvenues.length;i++)
      {
        dt.push({
          value:this.keyvenues[i].paperCount,
          name:this.keyvenues[i].venue.name,
        })
      }
      return dt
    },
    getKeyJournal()
    {
       keyJournal(this.interest).then(
           res=>{
             console.log(res.data)
             this.keyvenues=res.data.slice(0,this.count)
             console.log(this.keyvenues)
             this.drawChart()
           }
       )
    }


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
