<template>
  <!-- <div class="hello">
    <h1>{{ totalSubmeters }}</h1>
	<h2>{{ perKwh }}</h2>
	<input type="number"  :value="amountDue" placeholder="amount due" @keyup="onChangeAmountDue" />
	<input type="number" :value="kwUsed" placeholder="kw used" @input="onChangeKwused" />
	<button  @click="add_sub_meter()">submit</button>
  </div>
 -->
	<div>
		<Row :gutter="16">
			<Col :sm="24" :md="8">
				<span :style="{fontWeight: 'bold'}">Total Amoun Due</span>
				<br>
				<br>
				<InputNumber placeholder="Enter Bill Amount..." :value="amountDue"  size="large"  @input="onChangeAmountDue" :style="{marginTop:'15px', width: '100%'}"></InputNumber>
				<Form :model="formLeft" label-position="left" :label-width="130" :style="{marginTop: '14px'}">
					<b>Energy Rate</b>
					<FormItem label="Current Bill Amount" :style="{marginTop: '14px'}">
						<Input placeholder="Bill Amount" icon="help-circled"></Input>
					</FormItem>
					<FormItem label="KWH Used" :style="{marginTop: '14px'}">
						<Input placeholder="Enter KWH"  :value="kwUsed" @input="onChangeKwused"></Input>
					</FormItem>
					<FormItem label="KW/H per Submeter" :style="{marginTop: '14px'}">
						<Input placeholder="per submeter" readonly :value="perKwh" ></Input>
					</FormItem>
					<b>Fields below are automatically updated once you added new submeter</b>
					<FormItem label="Numbers of submeter/s" :label-width="175" :style="{marginTop: '14px'}">
						<Input placeholder="Total submeter" readonly :value="totalSubmeters" ></Input>
					</FormItem>
				</Form>
			</Col>
			<Col :sm="24" :md="16">
				<span :style="{fontWeight: 'bold'}">Compute Bills</span>
				<br>
				<br>
				<Form ref="formsubmit" :model="formsubmit" :rules="rulesSubmit">
					<Row :gutter="16">
						<Col :xs="24" :sm="5" :md="5">
							<label>Meter ID</label>
							<FormItem prop="meterId">
								<Input placeholder="Meter ID" v-model="formsubmit.meterId"></Input>
							</FormItem>
						</Col>
						<Col :xs="24" :sm="5" :md="5">
							<label>Fullname</label>
							<FormItem prop="fullname">
								<Input placeholder="Fullname" v-model="formsubmit.fullname"></Input>
							</FormItem>
						</Col>
						<Col :xs="24" :sm="5" :md="5">
							<label>Last Reading</label>
							<FormItem prop="lastReading">
								<Input placeholder="Last Reading" v-model="formsubmit.lastReading"></Input>
							</FormItem>
						</Col>
						<Col :xs="24" :sm="5" :md="5">
							<label>New Reading</label>
							<FormItem prop="newReading">
								<Input placeholder="New Reading" v-model="formsubmit.newReading"></Input>
							</FormItem>
						</Col>
						<Col :xs="24" :sm="4" :md="4">
							<br>
							<Button type="primary" @click="handleSubmit('formsubmit')">Add <Icon type="android-add-circle"></Icon></Button>
						</Col>
					</Row>
				</Form>
				<br>
				<Row v-if="list.length > 0">
					<Col span="24"v-for="item in list">
						<Row :gutter="16" class="res-content">
							<Row>
								<Col span="6">
									<h2>{{item.meterId}}</H2>
								</Col>
							</Row>
							<Col span="6">
								<span>{{item.fullname}}</span>
							</Col>
							<Col span="10">
								<Row>
									<Col span="12">
										Last Reading:
									</Col>
									<Col span="12">
										{{item.lastReading}}
									</Col>
									<Col span="12">
										New Reading:
									</Col>
									<Col span="12">
										{{item.newReading}}
									</Col>
									<Col span="12">
										KW/H Used:
									</Col>
									<Col span="12">
										{{item.newReading - item.lastReading}}
									</Col>
								</Row>
								</Col>
								<Col span="8">
									<div class="result">
											<h3 :style="{color: '#2d8cf0'}">Bill: {{(item.newReading - item.lastReading) * perKwh }}</h3>
									</div>
							</Col>
						</Row>
					</Col>
				</Row>
				<Col span="8">
					<h2> Total:
						<span v-if="list.length > 0"> {{totalbills}} </span>
						<span v-else>0</span>
					</h2>
				</Col>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
	  name: 'Home',

		data () {

				const validateLastReading = (rule, value, callback) => {
					if (this.formsubmit.newReading !== '') {
						this.$refs.formsubmit.validateField('newReading');
					}
					callback();
				}

				const validateNewReading = (rule, value, callback) => {
					if (Number(value) < Number(this.formsubmit.lastReading)) {
						callback(new Error('New reading must be greater than last reading!'))
					}
					callback();
				}

			return {
				formLeft: {
					amountDue: 1,
					currentBill: '',
					kwhUsed: ''
				},
				formsubmit: {
					meterId: '',
					fullname: '',
					lastReading: '',
					newReading: '',
				},
				rulesSubmit: {
					meterId: [
						{required: true, message: 'Meter ID is required.', trigger: 'blur'}
					],
					fullname: [
						{required: true, message: 'Fullname is required.', trigger: 'blur'}
					],
					lastReading: [
						{required: true, message: 'Last Reading is required.', trigger: 'blur'},
						{validator: validateLastReading, trigger: 'change'}
					],
					newReading: [
						{required: true, message: 'New Reading is required.', trigger: 'blur'},
						{validator: validateNewReading, trigger: 'change'}
					]
				}
			}
		},
		computed: {
			...mapGetters([
				'list',
			  'totalSubmeters',
			  'totalbills',
			  'amountDue',
			  'kwUsed',
			  'perKwh'
			])
		  },
		methods: {
			...mapActions([
				'add_sub_meter',
				'onChangeAmountDue',
				'onChangeKwused'
			]),
			handleSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
								this.$store.commit('add_sub_meter', this.formsubmit);
								this.$refs[name].resetFields();
            }
        })
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.res-content {
		border-bottom: solid 1px #dddee1;
	}
	.result {
		text-align: right;
	}
</style>
