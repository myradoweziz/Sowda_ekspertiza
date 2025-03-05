<template>
	<div class="transport">
		<div class="transport__container">
			<div class="transport__title-box">
				<div class="transport__title">Sargyt etmek</div>
				<div class="transport__add-btn">
					<!-- <Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" /> -->
				</div>
			</div>
			<div class="transport__cities">
				<div
					v-for="(item, index) in companyCommunicates"
					:key="item.id"
					@click="changeCities(index)"
					:class="['transport__city', { active: index == activeId }]"
				>
					{{ item.name }}
				</div>
			</div>
			<div class="transport__body">
				<div class="transport__table">
					<table>
						<thead>
							<tr>
								<th>Sargyt edilen wagty</th>
								<th>Sargyt edýäniň roly</th>
								<th>Sargyt edýäniň ady</th>
								<th>Elektron Poçtasy</th>
								<th>Edara ady(edara bolsa)</th>
								<th>Telefon belgisi</th>
								<th>Nireden</th>
								<th>Nira</th>
								<th>Awtobusyn gornusi</th>
								<th>Barmaly senesi we wagty:</th>
								<th>Sargydyn dowamlylygy:</th>
								<th>Adam sany</th>
								<th>Bellik</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in orders" :key="item.uuid">
								<td v-html="new Date(item.created_at).toLocaleDateString()" />
								<td v-html="item.role_name" />
								<td v-html="item.name" />
								<td v-html="item.email" />
								<td v-html="item.name_of_entity" />
								<td v-html="item.phone" />
								<td v-html="item.come_to" />
								<td v-html="item.go_from" />
								<td v-html="item.name_vehicle" />
								<td v-html="new Date(item.date).toLocaleDateString()" />
								<td v-html="item.duration" />
								<td v-html="item.quantity" />
								<td v-html="item.mark" />
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'

	import { getToTruckOrders } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { Button },
		middleware: ['auth-admin'],
		async mounted() {
			await this.fetchToOrders()
		},
		data() {
			return {
				activePopup: false,
				activeId: 1,
				limit: 10,
				page: 0,
				orders: [],
				companyCommunicates: [
					{ id: 0, name: 'Awtobus' },
					{ id: 1, name: 'Ýük ulagy' }
				]
			}
		},
		methods: {
			openPopup() {
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
			},
			changeCities(idx) {
				if (idx == 0) {
					this.$router.push('/marketing/toOrder/')
				}
				if (idx == 1) {
					this.$router.push('/marketing/toOrder/truck')
				}
			},
			async fetchToOrders() {
				try {
					const { data, status } = await getToTruckOrders({ data: { l: this.limit, p: this.page } })
					if (status) this.orders = data.data.orders_truck
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.transport {
		// .transport__container
		&__title-box {
			height: 50px;
			padding: 5px 20px 5px 20px;
			border-radius: 2px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			background-color: #05659b;
		}

		// .admin-slider__title

		&__title {
			font-size: 18px;
			font-weight: 500;
			line-height: 21.09px;
			text-align: left;
			color: var(--white);
		}

		// .admin-slider__add-btn

		&__add-btn {
			display: flex;
			align-items: center;
		}

		// .transport__cities

		&__cities {
			padding: 20px 0px 0px 20px;
			display: flex;
			gap: 30px;
		}

		// .transport__city

		&__city {
			cursor: pointer;
			padding: 10px 20px;
			font-size: 14px;
			line-height: 21px;
			font-weight: 900;
			color: var(--text);
			border: 2px solid #05659b;
			border-radius: 4px;
			transition: 0.3s;
			&.active,
			&:hover {
				background-color: #05659b;
				color: var(--white);
				transition: 0.3s;
			}
		}

		// .transport__body

		&__body {
			padding: 20px;
		}

		// .transport__table

		&__table {
			height: calc(100vh - 232px);
			overflow: auto;
		}

		// .transport__pagination

		&__pagination {
		}
	}
</style>
