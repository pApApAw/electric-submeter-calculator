import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		amount_due: 0,
		kw_used: '',
		perKwh: '',
		list: [],

	},
	getters: {
		list( state ) {
			return state.list
		},
		totalSubmeters( state ) {
			return state.list.length
		},
		totalbills( state ) {
			return state.list.reduce((total, p) => {
				return total + (p.newReading - p.lastReading) * state.perKwh;
			}, 0);
		},

		amountDue ( state ) {
			return state.amount_due
		},

		kwUsed ( state ) {
			return state.kw_used
		},

		perKwh ( state ) {
			return state.perKwh
		}
	},
	actions: {
		add_sub_meter ( {commit, state}, obj ) {
			commit('add_sub_meter', obj)
		},
		onChangeAmountDue ({commit, state}, e) {
			commit('amount_due', e)
			commit('perKwh')
		},
		onChangeKwused ({commit, state}, value) {
			commit('kw_used', value)
			commit('perKwh')
		}
	},

	mutations: {
		add_sub_meter ( state ,obj ) {
			state.list.push({ meterId:obj.meterId, fullname: obj.fullname, lastReading: obj.lastReading, newReading: obj.newReading })
		},
		amount_due ( state, value ) {
			state.amount_due = value
		},
		kw_used ( state, value ) {
			state.kw_used = value
		},
		perKwh (state) {
			state.perKwh = state.amount_due / state.kw_used 
		}
	}
});
