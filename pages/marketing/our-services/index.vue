<template>
	<div class="service">
		<div class="service__container">
			<div class="service__title-box">
				<div class="service__title">Hyzmatlarymyz</div>
				<div class="service__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="service__body">
				<div class="service__table" v-if="services">
					<table>
						<thead>
							<tr>
								<th>title</th>
								<th>text</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in services" :key="item.uuid">
								<td class="title" v-html="item.title_tm" />
								<td class="text" v-html="item.text_tm" />
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="selectService(item)" prependIcon="edit2Admin" onlyIcon />
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
				@save="saveService"
				@add="addService"
				:form="form"
				service
				path="services"
			/>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupAboutAll from '@/components/Popup/PopupAboutAll.vue'

	import { addServices, deleteServices, getServices } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		components: { PopupAboutAll, Button },
		computed: { ...mapGetters(['imgURL']) },
		middleware: ['auth-admin'],
		data() {
			return {
				activePopup: false,
				page: 0,
				limit: 10,
				services: [],
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
			await this.getService()
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
			selectService(item) {
				this.form = item
				this.openPopup()
			},

			async getService() {
				try {
					const { data, status } = await getServices()
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
							uuid: form.uuid
						}
					})
					if (status) this.closePopup()
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
							title_tm: form.title_tm
						}
					})
					if (status) this.closePopup()
					await this.getService()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteSelected(id) {
				try {
					const { status } = await deleteServices({
						data: { uuid: id }
					})
					await this.getService()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service {
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

		// .about__body

		&__body {
			padding: 20px;
		}
		&__table {
			height: calc(100vh - 232px);
			overflow: auto;
		}
		&__pagination {
			padding-top: 40px;
		}
	}
</style>
