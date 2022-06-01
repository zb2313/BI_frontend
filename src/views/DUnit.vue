<template>
<div>
   <el-input v-model="interest" style="width: 300px"></el-input>
  <el-button @click="getKeyUnit">查询</el-button>
  <div id="main" style="width: 100%;height:1200px;"></div>
</div>
</template>

<script>
import {keyUnit} from "../api/domain";

export default {
  name: "DAUnit",
  components:{

  },
  data()
  {
    return{
      interest:"",
      keyunits:[],

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
          text: '关键机构查询',
          subtext: 'key units',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '50'
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
      for(let i=0;i<this.keyunits.length;i++)
      {
        dt.push({
          value:this.keyunits[i].ct,
          name:this.keyunits[i].affiliation.name
        })
      }
      return dt
    },
     getKeyUnit()
     {
       keyUnit(this.interest).then(
           res=>{
             this.keyunits=res.data;
             console.log(this.keyunits)
             this.drawChart()
           }
       )

     }


  }
}
</script>

<style scoped>

</style>
