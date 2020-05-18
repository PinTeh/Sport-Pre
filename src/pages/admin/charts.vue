<template>
  <div style="background:#fff;padding:20px;">
    <div id="main" style="width: 600px;height:400px;display:inline-block"></div>
    <div id="pie" style="width: 600px;height:400px;display:inline-block"></div>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "charts",
  data() {
    return {
      data: [],
      cityBar: {
        data: [],
        number: []
      },
      pieData: []
    };
  },
  methods: {
    myEcharts(val) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "各城市体育馆分布图"
        },
        tooltip: {},
        legend: {
          //data: ["数量"]
        },
        xAxis: {
          data: val.data
        },
        yAxis: {},
        series: [
          {
            name: "个数",
            type: "bar",
            data: val.number
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    pie(val) {
      var pieCharts = this.$echarts.init(document.getElementById("pie"));
      var option = {
        title: {
          text: "场地数量统计图",
          subtext: "订单场地",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20
          //data: data.legendData,

          //selected: data.selected
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: val,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      pieCharts.setOption(option);
    }
  },
  mounted() {
    let params = {
      page: 1,
      limit: 100
    };
    Api.cityList(params).then(res => {
      let ret = res.data.data;
      this.data = ret;
      this.data.map(item => {
        this.cityBar.data.push(item.cityname);
        this.cityBar.number.push(item.number.split("有")[1].split("个")[0]);
      });
      this.myEcharts(this.cityBar);
    });

    Api.number1().then(res => {
      this.pieData.push({
        name: '羽毛球场',
        value: res.data.data
      });
      Api.number2().then(res => {
        this.pieData.push({
          name: '篮球场数',
          value: res.data.data
        });
        Api.number3().then(res => {
          this.pieData.push({
            name: '足球场',
            value: res.data.data
          });
          Api.number4().then(res => {
            this.pieData.push({
              name: '泳池',
              value: res.data.data
            });

            Api.number5().then(res => {
              this.pieData.push({
                name: '乒乓球场',
                value: res.data.data
              });
              this.pie(this.pieData);
            });
          });
        });
      });
    });
  }
};
</script>

<style>
</style>