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
    <el-button @click="test2">测试</el-button>
    <div id="main" style="width: 100%;height:600px;"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import {keyUnitYear} from "../api/domain";
import axios from "axios";
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
      dtyear:[],
      dtyear2:[],
      colorIterator:0
    }
  },
  created() {

  },
  methods: {
    sortId(a, b) {
      return a.year - b.year
    },
    drawChart() {
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);
      const updateFrequency = 2000;
      const dimension = 0;
      /*let colorList = ['#00008b', '#f00', '#ffde00',
        '#002a8f', '#003580', '#ed2939', '#000',
        '#003897', '#f93', '#bc002d', '#024fa2',
        '#000', '#00247d', '#ef2b2d', '#dc143c',
        '#d52b1e', '#e30a17', '#00247d', '#b22234']*/
      /*let unityColors={

      };*/
      const data=this.dtyear2;
      const years = [];//时间列表
      for(let i=Number(this.begin);i<=Number(this.end);i++)
      {
        years.push(i)
      }
      console.log(years)
      let startIndex=0
      let startYear = years[startIndex];
      let option={
        grid: {
          top: 10,
          bottom: 30,
          left: 150,
          right: 80
        },
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            formatter: function (n) {
              return Math.round(n) + '';
            }
          }
        },
        dataset: {
          source: data.filter(function (d) {
            return d.year === startYear;
          })//获取该年的所有数据 列表形式
          //{[B,2000,xxxx], [A,2000,xxxx]}
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 10,
          axisLabel: {
            show: true,
            fontSize: 14,
            formatter: function (value) {
              return value;
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
        series: [
          {
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
              color: function (/*param*/) {
                //console.log("param",param)
                /*if(!unityColors[param.value.data.venue.id])
                {
                  unityColors[param.value.data.venue.id]
                      =colorList[(this.colorIterator)%19]
                  this.colorIterator++;
                }*/
                return /*unityColors[param.value.data.venue.id] ||*/ '#5470c6';
              }
            },
            encode: {
              x: dimension,
              y: 3
            },
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace'
            }
          }
        ],
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [
            {
              type: 'text',
              right: 160,
              bottom: 60,
              style: {
                text: startYear,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
              },
              z: 100
            }
          ]
        }
      };//option
      myChart.setOption(option);
      for (let i = startIndex; i < years.length; ++i) {
        (function (i) {
          setTimeout(function () {
            updateYear(years[i + 1]);
          }, (i - startIndex) * updateFrequency);
        })(i);
      }
      function updateYear(year) {
        let source = data.filter(function (d) {
          return d.year === year;
        });
        option.series[0].data = source;
        console.log(year,option.series[0].data[0].year,
            option.series[0].data)
        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
      }
    },
    setData()
    {
      this.dtyear=[]
      this.dtyear2=[]
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
                this.dtyear2.push(
                    {
                      "year":i,
                      "data":res.data[j]
                    }
                )
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
                console.log(this.dtyear2)
              }
            }
        )
      }
    },
    //右边横向条形图
    test2(){
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);
      const updateFrequency = 2000;
      const dimension = 0;
      const countryColors = {
        Australia: '#00008b',
        Canada: '#f00',
        China: '#ffde00',
        Cuba: '#002a8f',
        Finland: '#003580',
        France: '#ed2939',
        Germany: '#000',
        Iceland: '#003897',
        India: '#f93',
        Japan: '#bc002d',
        'North Korea': '#024fa2',
        'South Korea': '#000',
        'New Zealand': '#00247d',
        Norway: '#ef2b2d',
        Poland: '#dc143c',
        Russia: '#d52b1e',
        Turkey: '#e30a17',
        'United Kingdom': '#00247d',
        'United States': '#b22234'
      };
      axios.get(
          'https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json',
      ).then(
          res=>{
            let res0=res.data;

            axios.get('https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json')
                .then(
                    res=> {
                      // 指定图表的配置项和数据
                      let res1 = res.data;
                      console.log(res0)
                      console.log(res1)
                      const flags = res0;
                      const data = res1;//
                      console.log(data)
                      const years = [];//时间列表
                      console.log(years)
                      for (let i = 1; i < data.length; ++i) {
                        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
                          years.push(data[i][4]);
                        }
                      }
                      //简称
                      function getFlag(countryName) {
                        if (!countryName) {
                          return '';
                        }
                        return (
                            flags.find(function (item) {
                              return item.name === countryName;
                            }) || {}
                        ).emoji;
                      }
                      let startIndex = 10;
                      let startYear = years[startIndex];
                      let option = {
                        grid: {
                          top: 10,
                          bottom: 30,
                          left: 150,
                          right: 80
                        },
                        xAxis: {
                          max: 'dataMax',
                          axisLabel: {
                            formatter: function (n) {
                              return Math.round(n) + '';
                            }
                          }
                        },
                        dataset: {
                          source: data.slice(1).filter(function (d) {
                            return d[4] === startYear;
                          })//获取该年的所有数据 列表形式
                      //{[B,2000,xxxx], [A,2000,xxxx]}
                        },
                        yAxis: {
                          type: 'category',
                          inverse: true,
                          max: 10,
                          axisLabel: {
                            show: true,
                            fontSize: 14,
                            formatter: function (value) {
                              return value + '{flag|' + getFlag(value) + '}';
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
                        series: [
                          {
                            realtimeSort: true,
                            seriesLayoutBy: 'column',
                            type: 'bar',
                            itemStyle: {
                              color: function (param) {
                                return countryColors[param.value[3]] || '#5470c6';
                              }
                            },
                            encode: {
                              x: dimension,
                              y: 3
                            },
                            label: {
                              show: true,
                              precision: 1,
                              position: 'right',
                              valueAnimation: true,
                              fontFamily: 'monospace'
                            }
                          }
                        ],
                        // Disable init animation.
                        animationDuration: 0,
                        animationDurationUpdate: updateFrequency,
                        animationEasing: 'linear',
                        animationEasingUpdate: 'linear',
                        graphic: {
                          elements: [
                            {
                              type: 'text',
                              right: 160,
                              bottom: 60,
                              style: {
                                text: startYear,
                                font: 'bolder 80px monospace',
                                fill: 'rgba(100, 100, 100, 0.25)'
                              },
                              z: 100
                            }
                          ]
                        }
                      };
                      // console.log(option);
                      myChart.setOption(option);
                      for (let i = startIndex; i < years.length - 1; ++i) {
                        (function (i) {
                          setTimeout(function () {
                            updateYear(years[i + 1]);
                          }, (i - startIndex) * updateFrequency);
                        })(i);
                      }
                      function updateYear(year) {
                        let source = data.slice(1).filter(function (d) {
                          return d[4] === year;
                        });
                        option.series[0].data = source;
                        console.log(year,option.series[0].data[0][4])
                        option.graphic.elements[0].style.text = year;
                        myChart.setOption(option);
                      }

                    }
                )
          }
      )
    }
  },

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
