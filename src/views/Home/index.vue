<template>
    <div>
        <h1>欢迎来到啥也不是系统</h1>
         <div ref="chartDemodiv" style="width:100%;height:600px"></div>
    </div>
</template>
<style scoped>
h1{
    text-align: center;
}
</style>
<script>
import echarts from "echarts";
import bookinfoApi from "@/api/bookinfo.js";
export default {
  data() {
    return {
      chartDemo: null,
      bookTypeData: {
        bookType: [],
        quantitySum: []
      }
    };
  },
  computed: {
    options() {
      const option = {
        // 指定图表的配置项和数据
        title: {
          text: " 各种类型图书库存数量对比图", //为图表配置标题
          left: "center",
          textStyle: {
            color: "blue"
          }
        },
        tooltip: {
          //配置提示信息：
          trigger: "item", //当trigger为’item’时，鼠标只有移到对应数据点才会显示该点的数据，为’axis’时鼠标移到该列的范围区域都会显示对应的数据。
          axisPointer: {
            type: "shadow" //指示器类型：line:直线型; shadow:阴影型; none:无; cross:十字准星型
          }
        },
        legend: {
          //配置图例
          top: 40, //设置图例距顶部距离，外面不要单引号，不要单位px
          data: [
            {
              name: "图一", //name名称必须与series下的name属性保持一致才有效
              // 强制设置图例图标为圆。
              icon: "circle",
              // 设置图例文本的效果
              textStyle: {
                color: "#545c64",
                fontFamily: "微软雅黑",
                fontSize: 16
              }
            }
          ]
        },
    
        series: [
          {
            name: "图一",
            hoverAnimation:true, //是否开启 hover 在扇区上的放大动画效果
			selectedMode:'single',  //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
    		selectedOffset:10, //选中扇区的偏移距离
            data: this.bookTypeData.quantitySum,
            type: "pie" //图表类型
          }
        ]
      };
      return option
    }
  },
  created() {
    this.getBookTypeSum();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getBookTypeSum() {
      bookinfoApi.getTypeSum().then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.bookTypeData.bookType = resp.data.bookType;
          this.bookTypeData.quantitySum = resp.data.quantitySum;
          console.log(this.bookTypeData.bookType);
          console.log(this.bookTypeData.quantitySum);
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    drawLine() {
      this.chartDemo = echarts.init(this.$refs["chartDemodiv"]);
      this.chartDemo.setOption(this.options,true);
       window.addEventListener("resize", this.chartDemo.resize); 
    }
  },
  watch:{
      options(newVal,oldVal){
          if(newVal!==oldVal)
          {
              this.chartDemo.setOption(this.options,true);
          }
      }
  }
};
</script>