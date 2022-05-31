<template>
  <div>
    <el-input style="width:600px " v-model="interest"></el-input>
    <el-select v-model="searchType" placeholder="请选择查询类型">
      <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="getKeyAuthor">查询</el-button>
    <div id="main" style="width: 100%;height:600px;"></div>
  </div>
</template>

<script>
import {keyAuthor} from "../api/domain";
export default {
  name: "DAUnit",
  components:{

  },
  data()
  {
    return{
      interest:"new product",
      series:{

      },
      authors:[],
      authorname:[],
      hindexes:[],
      pindexes:[],
      upindexs:[],
      publishcounts:[],
      searchType:"",
      searchOptions:[
        {
          value: 0,
          label: 'hindex'
        }, {
          value: 1,
          label: 'pindex'
        }, {
          value: 2,
          label: 'upindex'
        }, {
          value: 3,
          label: 'publishcount'
        }
      ]
    }
  },
  mounted() {
   // this.drawChart()
    //this.getKeyAuthor()
  },
  methods:{
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据


      let config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: config.rotate,
            align: config.align,
            verticalAlign: config.verticalAlign,
            position: config.position,
            distance: config.distance
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };
      const labelOption = {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      let option=this.setOption(labelOption)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    setData(labelOption)
    {
      let series= [
        {
          name: 'hindex',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: this.hindexes
        },
        {
          name: 'pindex',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: this.pindexes
        },
        {
          name: 'upindex',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: this.upindexs
        },
        {
          name: 'publishcount',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: this.publishcounts
        }
      ]
      return series
    },
    setOption(labelOption)
    {
      let series=this.setData(labelOption)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['hindex', 'pindex', 'upindex', 'publishcount']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.authorname
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      };
      return option
    },
    getKeyAuthor()
    {
        this.authorname=[]
        this.hindexes=[]
        this.pindexes=[]
        this.upindexs=[]
        this.authorname=[]
        this.publishcounts=[]
        keyAuthor(this.interest, this.searchType).then(
            res => {

              this.authors=res.data.slice(0,5)
              console.log(this.authors)
              for(let i=0;i<5;i++)
              {
                this.authorname.push(this.authors[i].name)
                this.hindexes.push(this.authors[i].hindex)
                this.pindexes.push(this.authors[i].pindex)
                this.upindexs.push(this.authors[i].upindex)
                this.publishcounts.push(this.authors[i].publishCount)
              }
              console.log(this.authorname)
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
