<template>
	<div class="transport">
		<div class="transport__container">
			<div class="transport__title-box">
				<div class="transport__title">Habarlasmak</div>
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
								<th>Ady</th>
								<th>Elektron poçtasy</th>
								<th>Tel. nomeri</th>
								<th>Wagty</th>
								<th>Text</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in communicates" :key="item.uuid">
								<td v-html="item.name" />
								<td v-html="item.email" />
								<td v-html="item.phone" />
								<td v-html="new Date(item.created_at).toLocaleDateString()" />
								<td v-html="item.message" />
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

	import { getContactList, getCities } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		computed: { ...mapGetters(['imgURL']) },
		components: { Button },
		middleware: ['auth-admin'],
		data() {
			return {
				activePopup: false,
				activeId: 1,
				limit: 10,
				page: 0,
				communicates: [],
				cities: [],
				companyCommunicates: [
					{ id: 0, name: 'Gokdepe' },
					{ id: 1, name: 'Baherden' },
					{ id: 2, name: 'Kaka' }
				]
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
			},
			changeCities(idx) {
				if (idx == 1) {
					this.$router.push('/marketing/communicate/baherden')
				}
				if (idx == 0) {
					this.$router.push('/marketing/communicate/')
				}
				if (idx == 2) {
					this.$router.push('/marketing/communicate/kaka')
				}
			},
			async getCity() {
				try {
					const { data, status } = await getCities()
					if (status) this.cities = data.data
					await this.getCommunicate(this.cities[1].uuid)
				} catch (error) {
					console.error(error)
				}
			},
			async getCommunicate(id) {
				try {
					const { data, status } = await getContactList({ data: { uuid: id, l: this.limit, p: this.page } })
					if (status) this.communicates = data.data.get_contact_list
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
