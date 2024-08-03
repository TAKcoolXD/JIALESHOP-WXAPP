<template>
    <view class="container">
        <view class="title">图表插件链接</view>
        <text>https://www.ucharts.cn/</text>


        <view class="title">数量统计</view>
        <view class="achieve">
            <view class="order bg-abstract">
                <view class="label">
					<u-icon class="icon" size="30" color="#fff" name="order" />总订单数
				</view>
                <view class="count">100 单</view>
            </view>
            <view class="sale bg-abstract">
                <view class="label">
                    <u-icon class="icon" size="30" color="#fff" name="shopping-cart" />总销售额
				</view>
                <view class="money">2000 元</view>
            </view>
            <view class="profit bg-abstract">
                <view class="label">
                    <u-icon class="icon" size="30" color="#fff" name="man-add" />总客户量
				</view>
                <view class="money">300 个</view>
            </view>
        </view>

        <view class="title">客户分析</view>
        <view class="ChartsBox">
            <qiun-data-charts 
                type="column"
                :opts="opts1"
                :chartData="chartData1"
            />
        </view>

        <view class="title">回访分析</view>
        <view class="ChartsBox">
            <qiun-data-charts 
                type="line"
                :opts="opts2"
                :chartData="chartData2"
            />
        </view>
    </view>
</template>

<script>
    export default {
        onReady()
        {
            this.chartCount1()
            this.chartCount2()
        },
        data()
        {
            return {
                chartData1: {},
                opts1: {
                    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
                    padding: [15,15,0,5],
                    legend: {},
                    xAxis: {
                    disableGrid: true
                    },
                    yAxis: {
                    data: [
                        {
                        min: 0
                        }
                    ]
                    },
                    extra: {
                    column: {
                        type: "group",
                        width: 30,
                        activeBgColor: "#000000",
                        activeBgOpacity: 0.08
                    }
                    }
                },
                chartData2: {},
                opts2: {
                    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
                    padding: [15,10,0,15],
                    legend: {},
                    xAxis: {
                    disableGrid: true
                    },
                    yAxis: {
                    gridType: "dash",
                    dashLength: 2
                    },
                    extra: {
                    line: {
                        type: "straight",
                        width: 2
                    }
                    }
                },




            }
        },
        methods:{
            chartCount1()
            {
                //模拟从服务器获取数据时的延时
                setTimeout(() => {
                    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
                    let res = {
                        categories: ["2016","2017","2018","2019","2020","2021"],
                        series: [
                        {
                            name: "目标值",
                            data: [35,36,31,33,13,34]
                        },
                        {
                            name: "完成量",
                            data: [18,27,21,24,6,28]
                        }
                        ]
                    }
                    this.chartData1 = JSON.parse(JSON.stringify(res));
                }, 500);
            },
            chartCount2()
            {
                //模拟从服务器获取数据时的延时
                setTimeout(() => {
                    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
                    let res = {
                        categories: ["2016","2017","2018","2019","2020","2021"],
                        series: [
                        {
                            name: "成交量A",
                            data: [35,8,25,37,4,20]
                        },
                        {
                            name: "成交量B",
                            data: [70,40,65,100,44,68]
                        },
                        {
                            name: "成交量C",
                            data: [100,80,95,150,112,132]
                        }
                        ]
                    };
                    this.chartData2 = JSON.parse(JSON.stringify(res));
                }, 500);
            },

        }
    }
</script>


<style>
	.container {
		padding: 0px 10px;
	}

	.title {
		font-weight: bold;
		font-size: 15px;
		padding: 15px 0px;
	}
	
	.achieve {
		height: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}
	.achieve .order,
	.achieve .sale,
	.achieve .profit,
	.global .visitor,
	.global .order,
	.global .sale {
		position: relative;
		height: 100%;
		border-radius: 4px;
		width: 32%;
	}

	.achieve .order {
		background-color: #3c9cff;
	}

	.achieve .sale {
		background-color: #f9ae3d;
	}

	.achieve .profit {
		background-color: #5ac725;
	}
	
	.achieve .count,.global .count {
		font-size: 22px;
		font-weight: bold;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
	.achieve .money,.global .money {
		font-size: 22px;
		font-weight: bold;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
	.money::before {
		content: "¥";
		margin-right: 2px;
		font-weight: normal;
		font-size: 22px;
	}

	.achieve .label,.global .label {
		font-size: 14px;
		position: absolute;
		top: 10px;
		left: 10px;
		text-align: center;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.achieve .label .icon,.global .label .icon  {
		margin-right: 4px;
	}

	.ChartsBox{
		width:100%;
		height:300px;
	}
</style>
