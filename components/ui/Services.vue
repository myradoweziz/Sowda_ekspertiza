<template>
	<div class="services">
		<div class="services__container">
			<div class="services__box">
				<h2>{{ $t('our') }}</h2>
				<div class="services__items">
					<div
						v-for="item in services?.slice(0, 1)"
						:key="item.uuid"
						@click="openFirstService(item.uuid)"
						class="services__item"
					>
						<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="medal" />
					</div>
					<div
						v-for="item in services?.slice(1, 2)"
						:key="item.uuid"
						@click="openSecondService(item.uuid)"
						class="services__item"
					>
						<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="shield" />
					</div>
					<div
						v-for="item in services?.slice(2, 3)"
						:key="item.uuid"
						@click="openThirdService(item.uuid)"
						class="services__item"
					>
						<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="truck" />
					</div>
					<div
						v-for="item in services?.slice(3)"
						:key="item.uuid"
						@click="openFoursService(item.uuid)"
						class="services__item"
					>
						<service-item :text="normalizeTextByLang(item, 'title')[$i18n.locale]" icon="profile" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import ServiceItem from '@/components/ui/ServiceItem.vue'

	import { getServices } from '@/api/user.api'

	export default {
		components: { BaseIcon, ServiceItem },
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
	.services {
		width: 100%;
		padding: 40px 0px;
		@media (max-width: 992px) {
			padding: 20px 0px;
		}

		@media (max-width: 768px) {
			padding: 10px 0px;
		}

		// .services__container

		&__container {
			width: 100%;
			height: 100%;
			position: relative;
		}

		&__back {
			position: absolute;
			right: -20%;
			top: 50%;
			z-index: -1;
		}

		// .services__box

		&__box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			h2 {
				font-size: 30px;
				font-weight: 700;
				line-height: 36px;
				text-align: justify;
				color: var(--black);
				@media (max-width: 425px) {
					font-size: 16px;
					font-weight: 700;
					line-height: 19.2px;
				}
			}
			@media (max-width: 768px) {
				gap: 10px;
			}
		}

		// .services__items

		&__items {
			display: flex;
			width: 100%;
			height: 100%;
			gap: 20px;
			@media (max-width: 768px) {
				gap: 20px;
				flex-wrap: wrap;
			}
		}

		// .services__item

		&__item {
			width: calc(100% / 4);
			display: flex;
			&:deep() {
				.service-item {
					.service-item__box {
						&:hover {
							cursor: pointer;
							background-color: #05659b;
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
				width: calc(100% / 2 - 10px);
			}
			@media (max-width: 320px) {
				width: calc(100% / 1);
			}
		}
	}
</style>
