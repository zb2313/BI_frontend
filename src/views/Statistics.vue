<template>
  <div style="width: 700px">
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="myChart" :style="{width: '1000px', height: '800px'}"></div>
      </el-col>
      <el-col :span="1" style="position: absolute; left: 10%;">
        <el-row>
          <el-button @click="showTraceStatus">溯源统计</el-button>
        </el-row>
        <el-row>
          <el-button @click="showStyleStatus">类别统计</el-button>
        </el-row>
        <el-row>
          <el-button @click="showScoreStatus">分数统计</el-button>
        </el-row>

      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Statistics",
  data() {
    return {}
  },
  mounted() {
    // this.drawLine();
  },
  created() {
    this.showStyleStatus()
  },
  methods: {
    drawLine(option) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(option, true);
    },
    async showTraceStatus() {
      var myoption = {
        title: {
          text: '溯源情况',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          // data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
            ],
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
/*      await getNonMovie().then(
          response => {

            myoption.series[0].data.push({value: response.data.tolMovie, name:"电影数据"})
            myoption.series[0].data.push({value: response.data.tolAsin - response.data.tolMovie, name:"非电影数据"})
          }
      )*/

      this.drawLine(myoption);
    },
    async showStyleStatus() {
      var myoption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: []
          }
        ]
      }
/*      await getStyleStatus().then(
          response => {
            console.log(response.data)
            var dataObj = response.data
            for (var i = 0; i < 20; i++) {
              var item = {
                value: dataObj[i].styleNum,
                name: dataObj[i].styleName
              }
              myoption.series[0].data.push(item)
            }
          }
      )*/
      // 绘制图表
      this.drawLine(myoption);
    },
    async showScoreStatus() {
      var myoption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
      var scoreData = []
      for (var i = 0; i < 10; i++) {
/*        await getImdbStatus(i).then(
            response => {
              // console.log(response.data)
              scoreData.push(response.data.number)
            }
        )
            .catch(function () {
              i--
            })*/
      }
      scoreData.push(0)
      console.log(scoreData)
      for (var j = 0; j < 10; j++) {
        myoption.series[0].data.push({value: scoreData[j] - scoreData[j + 1], name: String(j) + '-' + String(j + 1)})
      }

      this.drawLine(myoption)
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

</style>
