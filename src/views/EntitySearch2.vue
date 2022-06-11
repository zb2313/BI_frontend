<template>
  <div>
    <el-input v-model="index" style="width: 200px"></el-input>
    <el-select v-model="searchType" placeholder="请选择" style="width: 200px">
      <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="setData">加载数据</el-button>
    <el-button @click="drawChart">绘图</el-button>
    <el-button @click="test">测试</el-button><br>
    <div id="main" style="width: 100%;height:600px;"></div>

  </div>
</template>

<script>
import {relateEntityAuthor} from "../api/entity";
import {relateEntityPaper} from "../api/entity";
//import {relateEntityAll} from "../api/entity";
export default {
  name: "Graph",
  data: function () {
    return {
      index:'1223',
      dt:[],
      types:[
        {
          value:1,
          label:"author"
        },
        {
          value:2,
          label:"paper"
        }
      ],
      searchType:""
    };
  },
  created() {

  },
  methods: {
    setData()
    {
      let category=[]
      if(this.searchType==1) {
        relateEntityAuthor(this.index).then(
            res => {
              this.$message.success("成功加载")
              this.dt = res.data
              for (let i = 0; i < this.dt.data.length; i++) {
                this.dt.data[i].category = Number(this.dt.data[i].category)
                category.push(this.dt.data[i].category)
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
              //console.log("cat",category)
            }
        )
      }
      else {
        relateEntityPaper(this.index).then(
            res=>{
              this.$message.success("成功加载")
              this.dt = res.data
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
              //console.log(this.dt.data)
              console.log(this.dt.links)
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
                if(item.data.category==0)return `${item.data.title.slice(0,5)+"..."}`
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
      myChart.on('click', 'series.graph.label',  (params) =>{
        /*relateEntityAuthor(params.data.index).then(
            res=>{
              console.log("旧数据",this.dt)
              let dt=[]
              dt = res.data
              for (let i = 0; i < dt.data.length; i++) {
                dt.data[i].category = Number(dt.data[i].category)
              }
              //console.log(this.dt.data)
              console.log("new links",dt.links)

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
                        if(item.data.category==0)return `${item.data.title.slice(0,5)+"..."}`
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
                        return '<br />' +temStr
                            +
                            "<p style='text-align:right'>查看</p>";
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
                    data: dt.data,
                    links: dt.links,
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
              myChart.resize()
            }
        )*/
        console.log(params.data.name)
        if(params.data.category==0)
        {
          relateEntityPaper(params.data.index).then(
              res=>
              {
                let dt2=res.data
                console.log("新数据",res.data)
                for(let i = 0; i < dt2.data.length; i++)
                {
                  dt2.data[i].category = Number(dt2.data[i].category)
                }
                for (let i = 0; i < dt2.links.length; i++)
                {
                  dt2.links[i].label = {
                    show: true,
                    formatter: function (params) {
                      return `${params.data.type}`;
                    }
                  }
                  dt2.links[i].tooltip ={ show: false }
                }
                console.log(dt2)
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
                          if(item.data.category==0)return `${item.data.title.slice(0,5)+"..."}`
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
                          return '<br />' +temStr
                              +
                              "<p style='text-align:right'>查看</p>";
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
                      data: dt2.data,
                      links: dt2.links,
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
                myChart.resize()
              }
          )
        }
        else if (params.data.category==1){
          relateEntityAuthor(params.data.index).then(
              res=>
              {
                let dt2=res.data
                console.log("新数据",res.data)
                for(let i = 0; i < dt2.data.length; i++)
                {
                  dt2.data[i].category = Number(dt2.data[i].category)
                }
                for (let i = 0; i < dt2.links.length; i++)
                {
                  dt2.links[i].label = {
                    show: true,
                    formatter: function (params) {
                      return `${params.data.type}`;
                    }
                  }
                  dt2.links[i].tooltip ={ show: false }
                }
                console.log(dt2)
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
                          if(item.data.category==0)return `${item.data.title.slice(0,5)+"..."}`
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
                          return '<br />' +temStr
                              +
                              "<p style='text-align:right'>查看</p>";
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
                      data: dt2.data,
                      links: dt2.links,
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
                myChart.resize()
              }
          )
        }
        /*relateEntityAll(params.data.name).then(
            res=>
            {
              let dt2=res.data
              console.log("新数据",res.data)
              for(let i = 0; i < dt2.data.length; i++)
              {
                dt2.data[i].category = Number(dt2.data[i].category)
              }
              for (let i = 0; i < dt2.links.length; i++)
              {
                dt2.links[i].label = {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                }
                dt2.links[i].tooltip ={ show: false }
              }
              console.log(dt2)
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
                        if(item.data.category==0)return `${item.data.title.slice(0,5)+"..."}`
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
                        return '<br />' +temStr
                            +
                            "<p style='text-align:right'>查看</p>";
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
                    data: dt2.data,
                    links: dt2.links,
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
              myChart.resize()
            }
        )*/
        console.log('click');
      });
    },
    test()
    {
      let myChart = this.$echarts.init(document.getElementById('main'))
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
                return `${item.data.Name}`;
              }
            },
            tooltip: {
              formatter: function (params) {
                const item = params.data;
                let temStr = "";
                // 写个外部函数来获取名称， 把节点相关字段全部显示
                if (typeof item.Name != 'undefined') {
                  temStr += `作者名称：${item.Name}<br/>`;
                }
                if(typeof item.referenceCount != 'undefined'){
                  temStr += `被引用次数：${item.referenceCount}<br/>`;
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
            data: [
              {
                name: '34232',
                Name: 'ddd',
                category: 0
              },
              {
                name: '767645',
                Name: 'dkkk',
                referenceCount: "24",
                category: 1
              },
              {
                name: '899',
                Name: 'thtfhf',
                category: 2
              },
              {
                name: '7878',
                Name: 'hthf',
                category: 3
              }
            ],
            links: [
              {
                source: '899',
                target: '7878',
                type: 'belong_to',
                label: {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                },
                tooltip: { show: false }
              },
              {
                source: '7878',
                target: '34232',
                type: 'co_author',
                label: {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                },
                tooltip: { show: false }
              },
              {
                source: '34232',
                Name: 'ddrwd',
                target: '767645',
                type: 'has_interest',
                label: {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                },
                tooltip: { show: false }
              },
              {
                source: '7878',
                target: '767645',
                type: 'write',
                label: {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                },
                tooltip: { show: false }
              },
              {
                source: '899',
                target: '34232',
                type: 'write',
                label: {
                  show: true,
                  formatter: function (params) {
                    return `${params.data.type}`;
                  }
                },
                tooltip: { show: false }
              }
            ],
            categories: [
              //PAPER 0
              //AUTHOR 1
              //INTEREST 2
              //AFFILIATION 3
              //VENUE 4
              {
                name: 'author'
              },
              {
                name: 'paper'
              },
              {
                name: 'venue',
                symbol: 'roundRect',
                symbolSize: 100
              },
              {
                name: 'interest',
                symbolSize: 30
              },
              {
                name: 'affiliation',
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
