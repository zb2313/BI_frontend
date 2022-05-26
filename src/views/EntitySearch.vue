<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="myChart" :style="{width: '1000px', height: '800px'}"></div>
      </el-col>
      <el-col :span="3" style="position: absolute; right: 7%;">
        <el-row>
          <el-radio v-model="radio1" label="1" border>导演id</el-radio>
        </el-row>
        <el-row>
          <el-radio v-model="radio1" label="2" border>演员id</el-radio>
        </el-row>
        <el-row>
          <el-input
              placeholder="请输入id"
              v-model="idInput"
              clearable>
          </el-input>
        </el-row>
        <el-row>
          <el-radio v-model="radio2" label="1" border>年</el-radio>
        </el-row>
        <el-row>
          <el-radio v-model="radio2" label="2" border>类别</el-radio>
        </el-row>
        <el-row>
          <el-button @click="showGraph1">绘制图表</el-button>
        </el-row>
        <el-row>
          <el-select v-model="value" placeholder="请选择类别">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>
          <el-button @click="showGraph2YearAndStyle">年份类别绘制图表</el-button>
        </el-row>
        <el-row>
          <el-button @click="showGraph2StyleAndScore">类别分数绘制图表</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "Graph",
  data: function () {
    return {
      radio1: '1',
      radio2: '1',
      idInput: 46694,
      yearOrStyleInput: '',
      value: '',
      options: [
        {value: "Drama", label: "Drama"},
        {value: "Comedy", label: "Comedy"},
        {value: "Action%20%26%20Adventure", label: "Action&Adventure"},
        {value: "Movies", label: "Movies"},
        {value: "All%20Sony%20Pictures%20Titles", label: "All Sony Pictures Titles"},
        {value: "Documentary", label: "Documentary"},
        {value: "Kids%20%26%20Family", label: "Kids & Family"},
        {value: "Horror", label: "Horror"},
        {value: "All%20Titles", label: "All Titles"},
        {value: "Animation", label: "Animation"},
        {value: "All%20MGM%20Titles", label: "All MGM Titles"},
        {value: "Fantasy", label: "Fantasy"},
        {value: "General", label: "General"},
        {value: "TV", label: "TV"},
        {value: "Musicals", label: "Musicals"},
        {value: "All%20BBC%20Titles", label: "All BBC Titles"},
        {value: "All%20HBO%20Titles", label: "All HBO Titles"},
        {value: "Classics", label: "Classics"},
        {value: "All%20Lionsgate%20Titles", label: "All Lionsgate Titles"},
        {value: "All%20Fox%20Titles", label: "All Fox Titles"},
      ],
      styleNames: [
        "Drama",
        "Comedy",
        "Action%20%26%20Adventure",
        "Movies",
        "All%20Sony%20Pictures%20Titles",
        "Documentary",
        "Kids%20%26%20Family",
        "Horror",
        "All%20Titles",
        "Animation",
        "All%20MGM%20Titles",
        "Fantasy",
        "General",
        "TV",
        "Musicals",
        "All%20BBC%20Titles",
        "All%20HBO%20Titles",
        "Classics",
        "All%20Lionsgate%20Titles",
        "All%20Fox%20Titles",
      ],
    };
  },
  created() {
    this.showGraph1()
  },
  methods: {
    drawLine(option) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(option, true);
    },
    async showGraph1Year() {
      var myoption = {
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }

      this.drawLine(myoption)
    },
    async showGraph1Style() {
      var myoption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }


      this.drawLine(myoption)
    },
    showGraph1() {
      if (this.radio2 == 1) {
        this.showGraph1Year()
      } else {
        this.showGraph1Style()
      }
    },
    // 年份加类别查询
    async showGraph2YearAndStyle() {
      var myoption = {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      };
      this.drawLine(myoption)
    },
    async showGraph2StyleAndScore() {
      var myoption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        legend: {
          data: ['Growth', 'Budget 2011', 'Budget 2012'],
          itemGap: 5
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Budget (million USD)',

          }
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100
          },
          {
            type: 'inside',
            start: 94,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          {
            name: 'imdb score',
            type: 'bar',
            data: []
          },
          {
            name: 'review point',
            type: 'bar',
            data:[]
          },
          {
            name: 'review emotion',
            type: 'bar',
            data: []
          }
        ]
      };
      this.drawLine(myoption)

    }
  },
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  margin-left: 20px;
}
</style>
