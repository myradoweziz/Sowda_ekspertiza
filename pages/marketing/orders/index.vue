<template>
	<div class="about">
		<div class="about__container">
			<div class="about__title-box">
				<div class="about__title">Sargytlar</div>
				<div class="about__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="about__body">
				<div class="about__table">
					<table>
						<thead>
							<tr>
								<th>Video</th>
								<th>Title</th>
								<th>Text</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in orders" :key="item.uuid">
								<td>
									<video :src="`${imgURL}/uploads/orders/${item.video_path}`" controls></video>
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
			<popup-orders v-if="activePopup" @close="closePopup" @add="addItem" @save="saveItem" :form="form" />
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupOrders from '@/components/Popup/PopupOrders.vue'

	import { getOrders, addOrders, deleteOrders } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		components: { Button, PopupOrders, Button },
		middleware: ['auth-admin'],
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return {
				activePopup: false,
				orders: [],
				form: {
					video__path: null,
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
			await this.getOrder()
		},
		methods: {
			openPopup() {
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
				this.form = {
					video__path: null,
					text_en: '',
					text_ru: '',
					text_tm: '',
					title_en: '',
					title_ru: '',
					title_tm: '',
					uuid: null
				}
			},
			editItem(item) {
				this.form = item
				this.openPopup()
			},
			videoChange(e) {
				this.form.img_path = e
			},
			async getOrder() {
				try {
					const { data, status } = await getOrders()
					if (status) this.orders = data.data
				} catch (error) {
					console.error(error)
				}
			},
			async addItem(form) {
				try {
					const { data, status } = await addOrders({
						data: {
							file: form.video_path,
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm
						}
					})
					if (status) await this.closePopup()
					await this.getOrder()
				} catch (error) {
					console.error(error)
				}
			},
			async saveItem(form) {
				try {
					const { data, status } = await addOrders({
						data: {
							file: form.video_path,
							text_en: form.text_en,
							text_ru: form.text_ru,
							text_tm: form.text_tm,
							title_en: form.title_en,
							title_ru: form.title_ru,
							title_tm: form.title_tm,
							uuid: form.uuid
						}
					})
					if (status) await this.closePopup()
					await this.getOrder()
				} catch (error) {
					console.error(error)
				}
			},
			async deleteItem(id) {
				try {
					const { status } = await deleteOrders({
						data: { uuid: id }
					})
					if (status) this.getOrder()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about {
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
			table {
				tbody {
					tr {
						td {
							video {
								width: 150px;
								height: 150px;
							}
						}
					}
				}
			}
		}

		// .about__pagination

		&__pagination {
			padding-top: 40px;
		}
	}
</style>
