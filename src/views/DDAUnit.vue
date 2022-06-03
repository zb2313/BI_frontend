<template>
  <div>
<!--输入兴趣-->
<!--    输入年限范围-->
    领域：
    <el-input v-model="interest" style="width: 100px">

    </el-input>
    起始年份：
    <el-input v-model="begin" style="width: 100px">

    </el-input>
    终止年份：
    <el-input v-model="end" style="width: 100px">

    </el-input>
    <el-button @click="setData()">
      查询
    </el-button>
    <el-button @click="drawChart()">
      绘图
    </el-button>
    <el-button @click="test">测试</el-button>
    <div id="main" style="width: 100%;height:600px;"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import {keyUnitYear} from "../api/domain";
export default {
  name: "DDAUnit",
  components:{
  },
  data()
  {
    return{
      interest:"new product",
      begin:2000,
      end:2010,
      dtyear:[]
    }
  },
  created() {

  },
  methods: {
    sortId(a,b){
      return a.year-b.year
    },
    drawChart() {
      // var newArr  = [
      //   {
      //     cdate: "2021-08",
      //     cname: "hunan,jiangxi,hubei,四川省,江苏省,广东省,河南省,甘肃省,贵州省,山东省,安徽省,广西壮族自治区,陕西省,福建省,河北省",
      //     cut: "79.10,13.82,1.28,0.56,0.49,0.48,0.47,0.47,0.41,0.32,0.30,0.29,0.24,0.24,0.22"
      //   },
      //   {
      //     cdate: "2021-09",
      //     cname: "湖南省,江西省,湖北省,广东省,河南省,四川省,广西壮族自治区,贵州省,福建省,陕西省,安徽省,江苏省,山东省,辽宁省,上海市",
      //     cut: "69.60,16.19,1.91,1.83,1.42,1.18,0.82,0.76,0.65,0.53,0.51,0.50,0.46,0.42,0.38"
      //   }
      // ]

      const myChart = echarts.init(document.getElementById("main"))
      var updateFrequency = 6000;
      let years = [];
      let startIndex = 0;
      for (let i = 0; i < this.dtyear.length; ++i) {
        if (years.length == 0) {
          years.push(this.dtyear[i])
        }
      }
      let startyear = years[startIndex].year;
      let startName = years[startIndex].names;
      let startCut = years[startIndex].paperCounts;
      let option = {
        grid: {
          top: 10,
          bottom: 30,
          left: 800,
          right: 30
        },
        xAxis: {
          max: 'dataMax',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(19,229,227, 0.4)',
              type: 'dashed'
            }
          }
        },
        dataset: {
          source: this.dtyear
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 15,
          data: startName,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14
            },
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [{
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: 'rgb(13,208,229)'
          },
          encode: {
            x: 0,
            y: 3
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace',
            formatter: function (data) {
              return startCut[data.dataIndex] + "%";
            }
          },
          data: startCut
        }],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [{
            type: 'text',
            right: 30,
            bottom: 60,
            style: {
              text: startyear,
              font: 'bolder 40px monospace',
              fill: 'rgba(19,229,227, 0.4)'
            },
            z: 100
          }]
        }
      };
      myChart.setOption(option)
      for (let i = startIndex; i < this.dtyear.length - 1; ++i) {
        (function (i) {
          setTimeout(function () {
            updateYear(this.dtyear[i + 1]);
          }, (i + 1) * updateFrequency);
        })(i);
      }

      function updateYear(year) {
        option.yAxis.data = year.names;
        option.series[0].data = year.paperCounts;
        option.graphic.elements[0].style.text = year.year;
        myChart.setOption(option);
      }
    },
    setData()
    {
      this.dtyear=[]
      console.log("jinru")
      for(let i=Number(this.begin);i<=Number(this.end);i++)
      {
        console.log("年",i)
        keyUnitYear(this.interest,i).then(
            res=>{
              let name=[],paperCounts=[]
              for(let j=0;j<res.data.length;j++)
              {
                 name.push(res.data[j].venue.name)
                 paperCounts.push(res.data[j].paperCount)
              }
              let dt={
                "names":name,
                "paperCounts":paperCounts,
                "year":i
              }
              this.dtyear.push(dt)
              if(i==this.end)
              {
                this.$message.success("数据加载完成")
                this.dtyear.sort(this.sortId);
                console.log(this.dtyear)
              }
            }
        )
      }
    },
    //右边横向条形图
    test()
    {
      var newArr  = [
        {
          cdate: "2021-08",
          cname: "湖南省,江西省,湖北省,四川省,江苏省,广东省,河南省,甘肃省,贵州省,山东省,安徽省,广西壮族自治区,陕西省,福建省,河北省",
          cut: "79.10,13.82,1.28,0.56,0.49,0.48,0.47,0.47,0.41,0.32,0.30,0.29,0.24,0.24,0.22"
        },
        {
          cdate: "2021-09",
          cname: "湖南省,江西省,湖北省,广东省,河南省,四川省,广西壮族自治区,贵州省,福建省,陕西省,安徽省,江苏省,山东省,辽宁省,上海市",
          cut: "69.60,16.19,1.91,1.83,1.42,1.18,0.82,0.76,0.65,0.53,0.51,0.50,0.46,0.42,0.38"
        }
      ]
      const myChart = echarts.init(document.getElementById("main"))
      var updateFrequency = 6000;
      var month = [];
      var startIndex = 0;
      for (var i = 0; i < newArr.length; ++i) {
        if (month.length == 0) {
          month.push(newArr[i])
        }
      }
      var startMonth = month[startIndex].cdate;
      var startName = month[startIndex].cname.split(',');
      var startCut = month[startIndex].cut.split(',');
      var option = {
        grid: {
          top: 10,
          bottom: 30,
          left: 300,
          right: 30
        },
        xAxis: {
          //max: 'dataMax',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(19,229,227, 0.4)',
              type: 'dashed'
            }
          }
        },
        dataset: {
          source: newArr
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 15,
          data: startName,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14
            },
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [{
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: 'rgb(13,208,229)'
          },
          encode: {
            x: 0,
            y: 3
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace',
            formatter: function (data) {
              return startCut[data.dataIndex] + "%";
            }
          },
          data: startCut
        }],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [{
            type: 'text',
            right: 30,
            bottom: 60,
            style: {
              text: startMonth,
              font: 'bolder 40px monospace',
              fill: 'rgba(19,229,227, 0.4)'
            },
            z: 100
          }]
        }
      };
      myChart.setOption(option)
      for (let i = startIndex; i < newArr.length - 1; ++i) {
        (function (i) {
          setTimeout(function () {
            updateYear(newArr[i + 1]);
          }, (i + 1) * updateFrequency);
        })(i);
      }

      function updateYear(year) {
        option.yAxis.data = year.cname.split(',');
        option.series[0].data = year.cut.split(',');
        option.graphic.elements[0].style.text = year.cdate;
        myChart.setOption(option);
      }
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
