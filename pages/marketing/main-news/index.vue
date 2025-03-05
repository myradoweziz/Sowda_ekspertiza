<template>
	<div class="about">
		<div class="about__container">
			<div class="about__title-box">
				<div class="about__title">Esasy habar</div>
				<div class="about__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="about__body">
				<div class="about__table" v-if="mainNews">
					<table>
						<thead>
							<tr>
								<th>Photo</th>
								<th>title</th>
								<th>text</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in mainNews" :key="item.uuid">
								<td>
									<img :src="`${imgURL}/uploads/news/${item.img_path}`" alt="" />
								</td>
								<td class="title" v-html="item.title_tm" />
								<td class="text" v-html="item.text_tm" />
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="editItem(item)" prependIcon="edit2Admin" onlyIcon />
										<Button @onClick="deleteItem(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
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
				@imageChange="imageChange"
				@add="addItem"
				@save="saveItem"
				:form="form"
				path="news"
				type="date"
				label="DATA"
				formDate
				updateText
			/>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupAboutAll from '@/components/Popup/PopupAboutAll.vue'

	import { getMainNews, addMainNews, deleteMainNews } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		components: { Button, PopupAboutAll, Button },
		middleware: ['auth-admin'],
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return {
				page: 9,
				text: 5,
				activePopup: false,
				mainNews: [],
				form: {
					img_path: null,
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					date: '',
					uuid: null
				}
			}
		},
		async mounted() {
			await this.getAbout()
		},
		methods: {
			openPopup(item) {
				if (this.mainNews && this.mainNews.length > 0 && !item) {
					alert('Ilki bilen onki bar bolan habary pozyn !')
					return
				}
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
				this.form = {
					img_path: null,
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					date: '',
					uuid: null
				}
			},
			editItem(item) {
				this.form = item
				this.openPopup(item)
			},
			imageChange(e) {
				this.form.img_path = e
			},
			async getAbout() {
				try {
					const { data, status } = await getMainNews()
					if (status) this.mainNews = data?.data || []
				} catch (error) {
					console.error(error)
				}
			},
			async addItem(form) {
				try {
					const { data, status } = await addMainNews({
						data: {
							file: form.img_path,
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm,
							date: form.date
						}
					})
					if (status) await this.closePopup()
					await this.getAbout()
				} catch (error) {
					console.error(error)
				}
			},
			async saveItem(form) {
				try {
					const { data, status } = await addMainNews({
						data: {
							file: form.img_path,
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm,
							date: form.date,
							uuid: form.uuid
						}
					})
					if (status) await this.closePopup()
					await this.getAbout()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteItem(id) {
				try {
					const { status } = await deleteMainNews({
						data: { uuid: id }
					})
					if (status) this.getAbout()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about {
		// .about__container
		&__container {
		}

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

		// .about__table

		&__table {
			height: calc(100vh - 232px);
			overflow: auto;
		}

		// .about__pagination

		&__pagination {
			padding-top: 40px;
		}
	}
</style>
