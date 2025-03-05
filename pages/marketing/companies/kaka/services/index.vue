<template>
	<div class="transport">
		<div class="transport__container">
			<div class="transport__title-box">
				<div class="transport__title">Kaka | Hyzmatlarymyz</div>
				<div class="transport__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
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
								<th>title</th>
								<th>text</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in services" :key="item.uuid">
								<td v-html="item.title_tm" />
								<td v-html="item.text_tm" />
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="selectEnterprice(item)" prependIcon="edit2Admin" onlyIcon />
										<Button @onClick="deleteSelected(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<popup-about-all
				v-if="activePopup"
				@close="closePopup"
				@add="addService"
				@save="saveService"
				:form="form"
				path="services"
				service
			/>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupAboutAll from '~/components/Popup/PopupAboutAll.vue'

	import { mapGetters } from 'vuex'
	import { getServices, getCities, addServices, deleteServices } from '@/api/admin.api'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { Button, PopupAboutAll },
		middleware: ['auth-admin'],
		data() {
			return {
				activePopup: false,
				activeId: 1,
				services: [],
				cities: [],
				companyCommunicates: [
					{ id: 0, name: 'Kaka' },
					{ id: 1, name: 'Hyzmatlarymyz' },
					{ id: 2, name: 'Habarlaşmak' }
				],
				form: {
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
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
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					uuid: null
				}
			},
			changeCities(idx) {
				if (idx === 0) {
					this.$router.push('/marketing/companies/kaka/')
				}
				if (idx === 2) {
					this.$router.push('/marketing/companies/kaka/communicate')
				}
			},
			selectService(item) {
				this.form = item
				this.openPopup()
			},
			async getCity() {
				try {
					const { data, status } = await getCities()
					if (status) this.cities = data.data
					await this.getService(this.cities[2].uuid)
				} catch (error) {
					console.error(error)
				}
			},
			async getService(id) {
				try {
					const { data, status } = await getServices({ data: { uuid: id } })
					if (status) this.services = data.data
				} catch (error) {
					console.error(error)
				}
			},
			async saveService(form) {
				try {
					const { data, status } = await addServices({
						data: {
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm,
							cities_id: this.cities[2].uuid,
							uuid: form.uuid
						}
					})
					if (status) this.closePopup()
					this.getCity()
				} catch (error) {
					console.error(error)
				}
			},
			async addService(form) {
				try {
					const { data, status } = await addServices({
						data: {
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm,
							cities_id: this.cities[2].uuid
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
					const { status } = await deleteServices({
						data: { uuid: id }
					})
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
