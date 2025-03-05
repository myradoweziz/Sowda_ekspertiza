<template>
	<div class="news">
		<div class="news__container">
			<div class="news__title-box">
				<div class="news__title">Hyzmatdaslarymyz</div>
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
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in news" :key="item.uuid">
								<td>
									<img :src="`${imgURL}/uploads/partner/${item.img_path}`" alt="" />
								</td>
								<td class="title">{{ item.link }}</td>
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
			<popup-partners
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
	import PopupPartners from '@/components/Popup/PopupPartners.vue'

	import { mapGetters } from 'vuex'
	import { ADD_PARTNERS, GET_PARTNERS, REMOVE_PARTNERS } from '~/api/admin.api'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { PopupPartners, Pagination, Button },
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
					link: ''
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
					link: ''
				}
			},
			selectNews(item) {
				this.form = item
				this.openPopup()
			},
			async getAllNews() {
				try {
					const { data, status } = await GET_PARTNERS({ data: { l: this.limit, p: this.page - 1 } })
					if (status) {
						this.pageLength = Math.ceil(data.data.count / this.limit)
						this.news = data.data
					}
				} catch (error) {
					console.error(error)
				}
			},
			async saveNews(form) {
				try {
					const { data, status } = await ADD_PARTNERS({
						data: {
							file: form.img_path,
							link: form.link
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
					const { data, status } = await ADD_PARTNERS({
						data: {
							file: form.img_path,
							link: form.link
						}
					})
					if (status) this.closePopup()
					this.getAllNews()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteSelected(uuid) {
				try {
					const { status } = await REMOVE_PARTNERS({
						data: { uuid }
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
