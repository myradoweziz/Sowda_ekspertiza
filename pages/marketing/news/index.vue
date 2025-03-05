<template>
	<div class="news">
		<div class="news__container">
			<div class="news__title-box">
				<div class="news__title">HABARLAR</div>
				<div class="news__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="news__body">
				<div class="news__table">
					<table>
						<thead>
							<tr>
								<th>Photo</th>
								<th>title</th>
								<th>text</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in news" :key="item.uuid">
								<td>
									<img :src="`${imgURL}/uploads/news/${item.img_path}`" alt="" />
								</td>
								<td class="title" v-html="item.title_tm" />
								<td class="text" v-html="item.text_tm" />
								<td class="data">{{ new Date(item.date).toLocaleDateString() }}</td>
								<td style="width: 150px">
									<div style="width: 100%; display: flex">
										<Button @onClick="selectNews(item)" prependIcon="edit2Admin" onlyIcon />
										<Button @onClick="deleteSelected(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="news__pagination">
				<pagination v-if="pageLength > 1" :pageCount="pageLength" v-model="page" @clickPage="updatePage" />
			</div>
			<popup-about-all
				v-if="activePopup"
				:form="form"
				@close="closePopup"
				@add="addItem"
				@save="saveNews"
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
	import Pagination from '@/components/base/Pagination.vue'
	import PopupAboutAll from '@/components/Popup/PopupAboutAll.vue'

	import { addNews, getNews, deleteNews } from '~/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { PopupAboutAll, Pagination, Button },
		middleware: ['auth-admin'],
		data() {
			return {
				limit: 10,
				page: 1,
				pageLength: 0,
				activePopup: false,
				updateText: true,
				news: [],
				form: {
					img_path: null,
					date: '',
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
			await this.getAllNews()
		},
		methods: {
			updatePage(p) {
				this.page = p
				this.getAllNews()
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
					uuid: null
				}
			},
			selectNews(item) {
				this.form = item
				this.openPopup()
			},
			async getAllNews() {
				try {
					const { data, status } = await getNews({ data: { l: this.limit, p: this.page - 1 } })
					if (status) {
						this.pageLength = Math.ceil(data.data.count / this.limit)
						this.news = data.data.news
					}
				} catch (error) {
					console.error(error)
				}
			},
			async saveNews(form) {
				try {
					const { data, status } = await addNews({
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
					if (status) {
						this.closePopup()
					}
					this.getAllNews()
				} catch (error) {
					console.error(error)
				}
			},
			async addItem(form) {
				try {
					const { data, status } = await addNews({
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
					this.getAllNews()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteSelected(id) {
				try {
					const { status } = await deleteNews({
						data: { uuid: id }
					})
					if (status) this.getAllNews()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news {
		// .news__container
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

		// .news__table

		&__table {
			height: calc(100vh - 232px);
			overflow: auto;
		}

		// .news__pagination

		&__pagination {
			padding-top: 40px;
		}
	}
</style>
