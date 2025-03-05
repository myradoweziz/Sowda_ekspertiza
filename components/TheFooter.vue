<template>
	<footer class="footer">
		<div class="footer__box">
			<div class="footer__top">
				<div class="footer__top-wrapper __container">
					<div class="footer__logo">
						<nuxt-link :to="localePath('/')" class="footer__logo-box">
							<base-icon name="logo" />
							<p>{{ $t('mapTitle') }}</p>
						</nuxt-link>
					</div>
					<div class="footer__item-box">
						<div class="footer__item">
							<div class="footer__item-title">{{ $t('fax') }}</div>
							<div class="footer__item-tel">
								<div class="footer__item-text">(+99312) 39-89-40</div>
								<div class="footer__item-text">(+99312) 39 88 42-43</div>
							</div>
						</div>
						<div class="footer__item">
							<div class="footer__item-title">{{ $t('email') }}</div>
							<div class="footer__item-tel">
								<div class="footer__item-text">trading@sanly.tm</div>
							</div>
						</div>
						<div class="footer__address">
							<div class="footer__item-title">{{ $t('address') }}</div>
							<div class="footer__item-text">{{ $t('mapAddress') }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="footer__bottom">
				<div class="footer__bottom-container __container">
					<div class="footer__text">© Copyright {{ new Date().getFullYear() }}, All Rights Reserved</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	export default {
		components: { BaseIcon }
	}
</script>

<style lang="scss" scoped>
	.footer {
		// .footer__box
		margin-top: 50px;
		border-top: 1px solid rgba(225, 225, 225, 1);

		&__box {
		}
		&__logo-box {
			display: flex;
			align-items: center;
			gap: 12px;
			color: inherit;
			min-width: 450px;
			@media (max-width: 768px) {
				min-width: 100%;
			}

			p {
				font-size: 16px;
				font-weight: 700;
				line-height: 19.2px;
				max-width: 400px;
				color: #111;
				@media (max-width: 768px) {
					font-size: 12px;
					// line-height: 15.2px;
				}
				@media (max-width: 425px) {
					font-size: 11px;
				}
			}
			img {
				width: 71.91px;
				height: 56.18px;
			}

			@media (max-width: 538px) {
				padding: 10px;
				&:deep(svg) {
					width: 40px;
				}
			}
			@media (max-width: 425px) {
				&:deep(svg) {
					width: 40px;
				}
			}
		}
		&__logo-title {
			font-size: 16px;
			font-weight: 700;
			line-height: 19.2px;
			text-align: left;
			color: var(--black);
			@media (max-width: 600px) {
				font-size: 15px;
				font-weight: 700;
				line-height: 18px;
			}
			@media (max-width: 400px) {
				font-size: 8px;
				width: 95px;
				&:nth-child(1) {
					width: 100px;
				}
			}
		}

		// .footer__top

		&__top {
			border: 1px solid #f8f8f8;
		}

		&__top-wrapper {
			width: 100%;
			display: flex;
			// align-items: center;
			padding: 30px 10px;
			justify-content: space-between;
			gap: 10px;
			@media (max-width: 992px) {
				gap: 20px;
				flex-direction: column;
			}
		}

		// .footer__item-box

		&__item-box {
			width: 100%;
			display: flex;
			justify-content: space-around;
			@media (max-width: 992px) {
				width: 100%;
				display: flex;
			}
			@media (max-width: 425px) {
				gap: 20px;
				width: 100%;
			}
		}

		// .footer__item

		&__item {
			width: 50%;
			@media (max-width: 425px) {
				width: 100%;
				display: flex;
				flex-direction: column;
			}
		}

		// .footer__address

		&__address {
			width: 25%;
			@media (max-width: 992px) {
				width: 100%;
			}
		}

		// .footer__item-title

		&__item-tel {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&__item-title {
			font-size: 18px;
			font-weight: 400;
			line-height: 21.6px;
			text-align: left;
			color: var(--black);
			padding-bottom: 10px;
			@media (max-width: 425px) {
				font-size: 15px;
				font-weight: 400;
				line-height: 18px;
				text-align: left;
			}
		}

		// .footer__item-text

		&__item-text {
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			text-align: left;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 10px;
				font-weight: 500;
				line-height: 12px;
				text-align: left;
			}
		}

		// .footer__bottom

		&__bottom {
			width: 100%;
			height: 40px;
			border: 0px 1px 1px 1px;
			padding: 12px 0px;
			background-color: #05659b;
		}

		// .footer__bottom-container

		&__bottom-container {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		// .footer__text

		&__text {
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			text-align: left;
			color: rgba(255, 255, 255, 1);

			@media screen and (max-width: 425px) {
				font-size: 11px;
				font-weight: 500;
				line-height: 13.2px;
				text-align: left;
			}
		}
	}
</style>
