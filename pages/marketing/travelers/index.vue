<template>
	<div class="transport">
		<div class="transport__container">
			<div class="transport__title-box">
				<div class="transport__title">GATNAWLAR</div>
				<div class="transport__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="transport__cities">
				<div
					v-for="(item, index) in cities"
					:key="item.uuid"
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
								<th>Gatnaw ugurlary</th>
								<th>Ugramaly nokady</th>
								<th>Ugraýan wagty</th>
								<th>Barmaly nokady</th>
								<th>Barmaly wagty</th>
								<th>Aýlaw sany</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in travelers" :key="item.uuid">
								<td>{{ item.route }}</td>
								<td>{{ item.start_point }}</td>
								<td>{{ item.start_time?.map((item) => item).join(' &nbsp;  ') }}</td>
								<td>{{ item.end_point }}</td>
								<td>{{ item.end_time?.map((item) => item).join(' &nbsp; ') }}</td>
								<td>{{ item.count }}</td>
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="selectTravel(item)" prependIcon="edit2Admin" onlyIcon />
										<Button @onClick="deleteSelected(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="transport__pagination">
				<pagination v-if="pageLength > 1" :pageCount="pageLength" v-model="page" @clickPage="updatePage" />
			</div>
			<popup-travelers v-if="activePopup" @close="closePopup" @add="addTravel" @save="saveTravel" :form="form" travel />
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import Pagination from '@/components/base/Pagination.vue'
	import PopupTravelers from '@/components/Popup/PopupTravelers.vue'

	import { getTravelers, getCities, addTravelers, deleteTravelers } from '@/api/admin.api'

	export default {
		layout: 'admin',
		components: { Pagination, Button, PopupTravelers },
		middleware: ['auth-admin'],
		data() {
			return {
				page: 1,
				pageLength: 0,
				limit: 5,
				activePopup: false,
				activeId: 0,
				travelers: [],
				cities: [],
				form: {
					route: 1,
					start_point: '',
					start_time: [],
					end_point: '',
					end_time: [],
					count: 1,
					uuid: null
				}
			}
		},
		async mounted() {
			await this.getCity()
		},
		methods: {
			openPopup() {
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
				this.form = {
					route: 1,
					start_point: '',
					start_time: [],
					end_point: '',
					end_time: [],
					count: 1,
					uuid: null
				}
			},
			changeCities(idx) {
				if (idx == 1) {
					this.$router.push('/marketing/travelers/baherden')
				}
				if (idx == 2) {
					this.$router.push('/marketing/travelers/kaka')
				}
			},
			updatePage(p) {
				this.page = p
				this.getCity()
			},
			selectTravel(item) {
				this.form = item
				this.openPopup()
			},
			async getCity() {
				try {
					const { data, status } = await getCities()
					if (status) this.cities = data.data
					await this.getTravel(this.cities[0].uuid)
				} catch (error) {
					console.error(error)
				}
			},
			async getTravel(id) {
				try {
					const { data, status } = await getTravelers({ data: { uuid: id, l: this.limit, p: this.page - 1 } })
					if (status) {
						this.pageLength = Math.ceil(data.data.count / this.limit)
						this.travelers = data.data.commutes
					}
				} catch (error) {
					console.error(error)
				}
			},
			async saveTravel(form, startTime, endTime) {
				try {
					const { data, status } = await addTravelers({
						data: {
							route: form.route,
							start_point: form.start_point,
							start_time: startTime,
							end_point: form.end_point,
							end_time: endTime,
							count: form.count,
							cities_id: this.cities[0].uuid,
							uuid: form.uuid
						}
					})
					if (status) this.closePopup()
					this.getCity()
				} catch (error) {
					console.error(error)
				}
			},
			async addTravel(form, startTime, endTime) {
				try {
					const { data, status } = await addTravelers({
						data: {
							route: form.route,
							start_point: form.start_point,
							start_time: startTime,
							end_point: form.end_point,
							end_time: endTime,
							count: form.count,
							cities_id: this.cities[0].uuid
						}
					})
					if (status) this.closePopup()
					await this.getCity()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteSelected(id) {
				try {
					const { status } = await deleteTravelers({ data: { uuid: id } })
					if (status) this.getCity()
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
