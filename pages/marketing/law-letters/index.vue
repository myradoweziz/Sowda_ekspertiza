<template>
	<div class="laws">
		<div class="laws__container">
			<div class="laws__title-box">
				<div class="laws__title">KADALAŞDYRYJY HUKUK NAMALAR</div>
				<div class="laws__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="laws__body">
				<div class="laws__table">
					<table>
						<thead>
							<tr>
								<th>Document</th>
								<th>Title</th>
								<th>Text</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in laws" :key="item.uuid">
								<td>
									<div class="cell">
										<div class="cell__icon">
											<BaseIcon name="file"></BaseIcon>
										</div>
										<div class="cell__content">
											<div class="cell__content-top">{{ item.img_path }}</div>
											<div class="cell__content-bottom">
												{{ formatBytes(item.size) }}
											</div>
										</div>
									</div>
								</td>
								<td v-html="item.title_tm" />
								<td v-html="item.text_tm" />
								<td>{{ new Date(item.date).toLocaleDateString() }}</td>
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="selectLaw(item)" prependIcon="edit2Admin" onlyIcon />
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
				@add="addLaw"
				@save="saveLaw"
				:form="form"
				type="date"
				label="DATE"
				formDate
			/>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupAboutAll from '@/components/Popup/PopupAboutAll.vue'

	import { getLaws, addLaws, deleteLaws } from '@/api/admin.api'

	export default {
		components: { Button },
		layout: 'admin',
		middleware: ['auth-admin'],
		data() {
			return {
				page: 0,
				limit: 5,
				activePopup: false,
				laws: [],
				form: {
					img_path: null,
					date: '',
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					size: '' | 0,
					uuid: null
				}
			}
		},
		async mounted() {
			await this.getLaw()
		},
		methods: {
			formatBytes(bytes, decimals = 2) {
				if (!+bytes) return '0 Bytes'
				const k = 1024
				const dm = decimals < 0 ? 0 : decimals
				const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
				const i = Math.floor(Math.log(bytes) / Math.log(k))
				return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
			},
			openPopup() {
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
				this.form = {
					img_path: null,
					date: '',
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					size: '' | 0,
					uuid: null
				}
			},
			selectLaw(item) {
				this.form = item
				this.openPopup()
			},
			async getLaw() {
				try {
					const { data, status } = await getLaws({ data: { l: this.limit, p: this.page } })
					if (status) this.laws = data.data.documents
				} catch (error) {
					console.error(error)
				}
			},
			async addLaw(form) {
				try {
					const { data, status } = await addLaws({
						data: {
							file: form.img_path,
							date: form.date,
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm
						}
					})
					if (status) this.closePopup()
					this.getLaw()
				} catch (error) {
					console.error(error)
				}
			},
			async saveLaw(form) {
				try {
					const { data, status } = await addLaws({
						data: {
							file: form.img_path,
							date: form.date,
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
					this.getLaw()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteSelected(id) {
				try {
					const { status } = await deleteLaws({
						data: { uuid: id }
					})
					if (status) this.getLaw()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.laws {
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

		// .laws__table

		&__table {
			height: calc(100vh - 232px);
			overflow: auto;
		}

		// .laws__pagination

		&__pagination {
			padding-top: 40px;
		}
	}
</style>
