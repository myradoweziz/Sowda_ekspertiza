<template>
	<div class="transport">
		<div class="transport__container">
			<div class="transport__title-box">
				<div class="transport__title">Bäherden | Habarlaşmak</div>
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
								<th>Telefon | Faks</th>
								<th>E-mail</th>
								<th>Salgymyz</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in contacts" :key="item.uuid">
								<td v-html="item.phone" />
								<td v-html="item.email" />
								<td v-html="item.address_tm" />
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
			<popup-communicate v-if="activePopup" @close="closePopup" @add="addContact" @save="saveContact" :form="form" />
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import PopupCommunicate from '~/components/Popup/PopupCommunicate.vue'

	import { getContacts, getCities, addContacts, deleteContacts } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { Button, PopupCommunicate },
		middleware: ['auth-admin'],
		data() {
			return {
				activePopup: false,
				activeId: 2,
				contacts: [],
				cities: [],
				companyCommunicates: [
					{ id: 0, name: 'Baherden awtotoplumy' },
					{ id: 1, name: 'Hyzmatlarymyz' },
					{ id: 2, name: 'Habarlaşmak' }
				],
				form: {
					phone: '',
					email: '',
					address_ru: '',
					address_tm: '',
					address_en: '',
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
					phone: '',
					email: '',
					address_ru: '',
					address_tm: '',
					address_en: '',
					uuid: null
				}
			},
			changeCities(idx) {
				if (idx == 0) {
					this.$router.push('/marketing/companies/')
				}
				if (idx == 1) {
					this.$router.push('/marketing/companies/services')
				}
			},
			selectContact(item) {
				this.form = item
				this.openPopup()
			},
			async getCity() {
				try {
					const { data, status } = await getCities()
					if (status) this.cities = data.data
					await this.getContact(this.cities[1].uuid)
				} catch (error) {
					console.error(error)
				}
			},
			async getContact(id) {
				try {
					const { data, status } = await getContacts({ data: { uuid: id } })
					if (status) this.contacts = data.data
				} catch (error) {
					console.error(error)
				}
			},
			async saveContact(form) {
				try {
					const { data, status } = await addContacts({
						data: {
							phone: form.phone,
							email: form.email,
							address_en: form.address_en,
							address_ru: form.address_ru,
							address_tm: form.address_tm,
							cities_id: this.cities[1].uuid,
							uuid: form.uuid
						}
					})
					if (status) this.closePopup()
					this.getCity()
				} catch (error) {
					console.error(error)
				}
			},
			async addContact(form) {
				try {
					const { data, status } = await addContacts({
						data: {
							phone: form.phone,
							email: form.email,
							address_en: form.address_en,
							address_ru: form.address_ru,
							address_tm: form.address_tm,
							cities_id: this.cities[1].uuid
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
					const { status } = await deleteContacts({
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
