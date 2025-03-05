<template>
	<div class="orders">
		<div class="orders__container __container">
			<div class="orders__backs">
				<div class="orders__back" @click="$router.go(-1)">
					<base-icon name="west" />
					<span>{{ $t('goBack') }}</span>
				</div>
			</div>
			<div class="orders__top" v-for="order in orders" :key="order.uuid">
				<div class="orders__title" v-html="normalizeTextByLang(order, 'title')[$i18n.locale]" />
				<div class="orders__content">
					<div class="orders__img-box">
						<div class="orders__img">
							<video v-if="order?.video_path" :src="`${imgURL}/uploads/orders/${order?.video_path}`" controls />
						</div>
					</div>
					<div class="orders__body">
						<div class="orders__text" v-html="normalizeTextByLang(order, 'text')[$i18n.locale]" />
						<div class="orders__button" @click="openCars">
							<Button :text="$t('allRight')" appendIcon="tick" primary padding />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/base/Button.vue'

	import { getOrders } from '@/api/user.api'
	import { mapGetters } from 'vuex'
	export default {
		layout: 'default',
		components: { Button },
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return {
				orders: []
			}
		},
		async mounted() {
			await this.fetchOrders()
		},
		methods: {
			async fetchOrders() {
				try {
					const { data, status } = await getOrders()
					if (status) {
						this.orders = data.data
					}
				} catch (error) {
					console.error(error)
				}
			},
			openCars() {
				this.$router.push('/ordersCars')
			},
			normalizeTextByLang(dontNormalItem, prefix = 'title') {
				return {
					tm: dontNormalItem[`${prefix}_tm`],
					ru: dontNormalItem[`${prefix}_ru`],
					en: dontNormalItem[`${prefix}_en`]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orders {
		padding: 60px 0px;
		@media (max-width: 768px) {
			padding: 40px 0px;
		}
		@media (max-width: 425px) {
			padding: 10px 0px;
		}
		// .orders__container

		&__container {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__backs {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__back {
			display: flex;
			gap: 10px;
			justify-content: flex-start;
			align-items: center;
			cursor: pointer;
			span {
				&:nth-child(1) {
					color: #05659b;
					transform: rotateY(180deg);
				}
				&:nth-child(2) {
					font-size: 20px;
					font-weight: 700;
					line-height: 24px;
					text-align: justify;
				}
			}
		}

		&__top {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__content {
			width: 100%;
			height: max-content;
		}

		// .orders__img-back

		&__img-box {
			float: left;
			margin-right: 20px;
			width: 50%;
			@media (max-width: 768px) {
				width: 100%;
				margin-right: 0px;
				margin-bottom: 20px;
			}
		}

		// .orders__img

		&__img {
			position: relative;
			padding-top: 58.725341426%;
			border-radius: 5px;
			video {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}

		// .orders__title

		&__title {
			font-size: 22px;
			font-weight: 600;
			line-height: 26.4px;
			text-align: left;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 15px;
				font-weight: 600;
				line-height: 18px;
				text-align: left;
			}
		}

		&__body {
			width: 100%;
			height: max-content;
			@media (max-width: 768px) {
				width: 100%;
			}
		}

		// .orders__text

		&__text {
			font-size: 20px;
			font-weight: 400;
			line-height: 24px;
			text-align: justify;
			color: #333333;
			width: 100%;
			height: max-content;
			@media (max-width: 768px) {
				width: 100%;
			}
			@media (max-width: 425px) {
				font-size: 9.7px;
				font-weight: 400;
				line-height: 11.64px;
				text-align: justify;
			}
		}

		&__button {
			width: max-content;
			display: flex;
			align-items: flex-start;
			justify-content: flex-end;
			margin-top: 20px;
		}
	}
</style>
