<template>
	<view class="updataAddress">
		<view style="color: #a4aeb4;margin: 20rpx 20rpx;">收货地址</view>
		<view
			style="width: 720rpx;height: 450rpx;margin: 0 auto;border-radius: 20rpx;background-color: white;border: 1px solid #adb6bc;">
			<view style="width: 680rpx;margin: 43rpx auto;">
				<u--form labelPosition="left" :model="form" ref="uForm">
					<u-form-item label="姓名" borderBottom ref="item1" labelWidth="150rpx">
						<u--input v-model="form.name" border="none"></u--input>
					</u-form-item>
					<u-form-item label="电话" borderBottom ref="item1" labelWidth="150rpx">
						<u--input v-model="form.phone" border="none"></u--input>
					</u-form-item>
					<u-form-item label="地区" borderBottom ref="item1" labelWidth="150rpx" @click="showPicker">
						<u--input border="none" v-model="form.region[0].label"></u--input>
					</u-form-item>
					<u-form-item label="详细地址" borderBottom ref="item1" labelWidth="150rpx">
						<u--input v-model="form.address" border="none"></u--input>
					</u-form-item>
				</u--form>
				<!-- <u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cancel"
					@change="changeHandler"></u-picker> -->
				<u-picker @cancel="cancel" :show="show" ref="uPicker" :columns="columns" keyName="name"
					@confirm="confirm" @change="changeHandler"></u-picker>

			</view>
		</view>
		<view @click="saveEdit"
			style="width: 700rpx;height: 80rpx;background-color: #ff547b;margin: 30rpx auto;border-radius: 20rpx;text-align: center;line-height: 80rpx;color: white;">
			保存</view>
	</view>
</template>

<script>
import address from '@/common/address.json'
export default {
	data() {
		return {
			form: {
				name: '',
				phone: '',
				region: [{ label: '', value: 1, }, { label: '', value: 2, }, { label: '', value: 3, }],
				address: '',
			},
			addressId: '',
			addressList: [],
			show: false,
			columns: [],//省份数据显示，三级联动需要三维数组，展示初始数据
			columnData: [],//市数据
			columnDatas: [],//区地址
		}
	},
	methods: {
		confirm(e) {
			console.log('确认', e);
			console.log('省', e.value[0].name);
			console.log('市', e.value[1].name);
			console.log('区', e.value[2].name);
			this.form.region[0].label = e.value[0].name;
			this.form.region[1].label = e.value[1].name;
			this.form.region[2].label = e.value[2].name;
			this.show = false

		},
		cancel() {
			this.show = false
		},
		changeHandler(e) {
			console.log('change', e);
			const {
				columnIndex,//当前选择的列，省 / 市 / 区
				value,  // 当前选择的数组内容
				values, // values为当前变化列的数组内容
				index,  // 当前列的下标值
				indexs, // 当前选择 省 市 区的下表值
				picker = this.$refs.uPicker
			} = e;
			// 当第一列值发生变化时，变化第二列和第三列的值（省份变更，市和区跟着变更）
			if (columnIndex === 0) { // 判断当前变更的是省还是市还是区
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[index]); //设置市为该省下面的所有市，index是当前省在省份数组的下标，对应市数组中的下表就是 该省下面的所有市 的数据
				picker.setColumnValues(2, this.columnDatas[index][0]); // 设置区域为该省下面第一个市下面的所有区域
			}
			if (columnIndex === 1) {
				// 当第二列发生变化 变化对应的第三列 
				picker.setColumnValues(2, this.columnDatas[indexs[0]][index]); //同上
			}

		},
		showPicker() {
			this.show = true
		},
		//初始化省份列表
		initDataPicker() {
			// 此处的province主要用作数据的初始化，即刚打开就需要进行展示的数据，这个跟第一条省份数据相关，我的第一条是北京市，所以需要columns中的三维数组，第一维度是省份数据数组，第二维度是市数据数组，第三维度是区数据数组
			let province = [];  //初始数据需要展示的省份
			let province1 = [{ name: '市辖区', code: '1101' }]; //因为第一个市北京市，所以就直接添加北京市下辖的直辖市了 也即初始数据需要展示的市，北京市只有一个市辖区
			let province2 = []; //初始数据需要展示的区域数据，也即是 北京市市辖区内的区
			address.map(item => {
				province.push(item);
			});

			address[0].children[0].children.map(item => {
				province2.push(item);
			});

			//省数据 因为要做数据初始化，所以是三维数组 
			// 数据格式 [ [所有的省份数据:{},{}] , [第一个省份下的所有的市:{},{},{}] , [第一个市下面所有的区:{},{},{}] ]
			this.columns.push(province);
			this.columns.push(province1);
			this.columns.push(province2);

			// 市数据数组，筛选address.json文件，将全国所有省下面的市数据放入数组
			// 格式[ [第一个省下面所有市,{},{},{}] , [第二个省下面所有市{},{},{}] , [第三个省下面所有市{},{},{}] ] 注意，以上的第一第二对应着 columns[0] 的数据

			address.map(item => {
				let city = [];
				item.children.map(item1 => {
					city.push(item1);
				});
				this.columnData.push(city);
			});

			//区数据数组
			//数据格式: [ 所有省下面所有市的所有区 [ 第一个省下面所有市的区:[ [第一个省下面第一个市的所有区] , [第一个省下面第二个市的所有区] ,]   ,   [ 第二个省下面所有市的区:[ [第二个省下面第一个市的所有区] , [第二个省下面第二个市的所有区] ,]   ]

			let area = [];
			address.map((item, index) => {
				let area1 = []; //省下面所有市的初始化
				item.children.map(item1 => {
					area = [];  //市下面的区初始化
					item1.children.map(item2 => {
						area.push(item2);
					});
					area1.push(area);// 每循环一个市，添加该市下面的所有区
				});
				this.columnDatas.push(area1);// 每循环一个省，添加该省下面的所有市
			});
		},
		saveEdit() {
			console.log('保存编辑内容');
			let a = this.form
			let data = {
				addressId: "10002",
				form: {
					content: "",
					detail: a.address,
					name: a.name,
					phone: a.phone,
					region: this.form.region
				},
				
			}
			console.log(data);

			uni.$u.http.post('address/edit', data).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					uni.navigateBack()
				}


			})
		}

	},
	onLoad(option) {
		console.log(option);
		let province
		let city
		let area
		uni.$u.http.get('address/list',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.addressList = res.data.list
			}
			this.addressId = this.addressList[0].address_id
			this.form.name = this.addressList[0].name
			this.form.phone = this.addressList[0].phone
			this.form.address = this.addressList[0].detail
			area = this.addressList[0].region.region
			city = this.addressList[0].region.city
			province = this.addressList[0].region.province
			this.form.region[0].label = province
			this.form.region[1].label = city
			this.form.region[2].label = area
			console.log('province', province);
			console.log('city', city);
			console.log('area', area);

		})
		this.initDataPicker()//初始化省份列表


	}
}
</script>

<style></style>
