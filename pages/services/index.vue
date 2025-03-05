<template>
	<div class="service-page">
		<div class="service-page__container __container">
			<div class="service-page__box">
				<div
					@click="openFirstService(item.uuid)"
					v-for="item in services?.slice(0, 1)"
					:key="item.uuid"
					class="service-page__item"
				>
					<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="medal" :isService="true" />
				</div>
				<div
					@click="openSecondService(item.uuid)"
					v-for="item in services?.slice(1, 2)"
					:key="item.uuid"
					class="service-page__item"
				>
					<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="shield" :isService="true" />
				</div>
				<div
					@click="openThirdService(item.uuid)"
					v-for="item in services?.slice(2, 3)"
					:key="item.uuid"
					class="service-page__item"
				>
					<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="truck" :isService="true" />
				</div>
				<div
					@click="openFoursService(item.uuid)"
					v-for="item in services?.slice(3)"
					:key="item.uuid"
					class="service-page__item"
				>
					<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="profile" :isService="true" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ServiceItem from '@/components/ui/ServiceItem.vue'

	import { getServices } from '@/api/user.api'

	export default {
		components: { ServiceItem },
		data() {
			return {
				services: []
			}
		},
		async mounted() {
			await this.fetchServices()
		},
		methods: {
			openFirstService(service) {
				this.$router.push(this.localeLocation(`/service_id1/${service}`))
			},
			openSecondService(service) {
				this.$router.push(this.localeLocation(`/service_id2/${service}`))
			},
			openThirdService(service) {
				this.$router.push(this.localeLocation(`/service_id3/${service}`))
			},
			openFoursService(service) {
				this.$router.push(this.localeLocation(`/service_id4/${service}`))
			},
			normalizeTextByLang(dontNormalItem, prefix = 'title') {
				return {
					tm: dontNormalItem[`${prefix}_tm`],
					ru: dontNormalItem[`${prefix}_ru`],
					en: dontNormalItem[`${prefix}_en`]
				}
			},
			async fetchServices() {
				try {
					const { data, status } = await getServices()
					if (status) this.services = data.data
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-page {
		padding: 60px 0px;
		@media (max-width: 768px) {
			padding: 40px 0px;
		}
		@media (max-width: 425px) {
			padding: 10px 0px;
		}
		// .service-page__container

		&__container {
			height: 100%;
			width: 100%;
		}

		// .service-page__box

		&__box {
			height: 100%;
			width: 100%;
			display: flex;
			gap: 40px;
			@media (max-width: 1200px) {
				gap: 20px;
			}
			@media (max-width: 768px) {
				flex-wrap: wrap;
				gap: 20px;
			}
		}

		&__item {
			display: flex;
			width: 25%;
			&:deep() {
				.service-item {
					.service-item__box {
						&:hover {
							cursor: pointer;
							background: #05659b;
							transition: 0.3s;

							svg {
								/* Adjusted the deep selector */
								path {
									fill: white;
									color: white;
								}
							}

							.service-item__title {
								color: white;
							}
						}
					}
				}
			}

			@media (max-width: 768px) {
				width: calc(50% - 10px);
			}
		}
	}
</style>
