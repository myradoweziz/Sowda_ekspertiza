<template>
	<div class="orders-cars">
		<div class="orders-cars__container __container">
			<div class="orders-cars__backs">
				<div class="orders-cars__back" @click="$router.go(-1)">
					<base-icon name="west" />
					<span>{{ $t('goBack') }}</span>
				</div>
			</div>
			<div class="orders-cars__service">
				<div class="orders-cars__service-box">
					<div class="orders-cars__service-itemBox">
						<div class="orders-cars__service-content">
							<div :class="['orders-cars__service-item', { active: activeCheck }]" @click="openCheckedFirst">
								<div class="orders-cars__service-appendIcon">
									<base-icon :name="activeCheck ? `radio_button_checked` : `radio_button_unchecked`" />
								</div>
								<div class="orders-cars__service-text">{{ $t('legalEntity') }}</div>
							</div>
							<div :class="['orders-cars__service-item', { active: isActive }]" @click="openCheckedSecond">
								<div class="orders-cars__service-appendIcon">
									<base-icon :name="isActive ? `radio_button_checked` : `radio_button_unchecked`" />
								</div>
								<div class="orders-cars__service-text">{{ $t('naturalPerson') }}</div>
							</div>
						</div>
						<div class="orders-cars__bottom">
							<div class="orders-cars__button">
								<Button @onClick="openCars" :text="$t('next')" padding appendIcon="west" primary />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/base/Button.vue'

	export default {
		layout: 'default',
		components: { Button },
		data() {
			return {
				isActive: false,
				activeCheck: false
			}
		},
		methods: {
			openCheckedFirst() {
				this.activeCheck = !this.activeCheck
				this.isActive = false
			},
			openCheckedSecond() {
				this.isActive = !this.isActive
				this.activeCheck = false
			},
			openCars() {
				if (this.activeCheck) {
					this.$router.push('/ordersCarTypesTruckFiziki')
				}
				if (this.isActive) {
					this.$router.push('/ordersCarTypesTruckYuridiki')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orders-cars {
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
		&__service {
			width: 100%;
			padding: 50px 0px;
			@media (max-width: 425px) {
				padding: 30px 0px;
			}
		}

		// .company-b__service-box

		&__service-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__service-itemBox {
			width: 800px;
			padding: 10px;
			display: flex;
			gap: 50px;
			flex-direction: column;
			@media (max-width: 768px) {
				width: 100%;
			}
			@media (max-width: 425px) {
				gap: 20px;
			}
		}

		&__service-content {
			width: 100%;
			display: flex;
			gap: 50px;
			justify-content: center;
			align-items: center;
			@media (max-width: 768px) {
				flex-direction: column;
			}
		}

		&__service-item {
			width: 100%;
			height: 60px;
			padding: 10px 20px 10px 20px;
			border-radius: 10px;
			border: 1px solid #dcdcdc;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 12px;
			cursor: pointer;
			transition: all 0.3s ease;
			&:hover,
			&.active {
				background-color: #fcfcfc;
				transition: all 0.3s ease;
			}
		}

		&__service-text {
			font-size: 20px;
			font-weight: 400;
			line-height: 24px;
			text-align: left;
			color: #111111;
			@media (max-width: 425px) {
				font-size: 14px;
			}
		}

		&__service-appendIcon {
			&:deep() {
				svg {
					@media (max-width: 425px) {
						width: 30px;
						height: 30px;
					}
				}
			}
		}
		&__service-prependIcon {
			&:deep() {
				svg {
					@media (max-width: 425px) {
						width: 30px;
						height: 30px;
					}
				}
			}
		}
		&__bottom {
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
		}
		&__button {
			width: max-content;
		}
	}
</style>
