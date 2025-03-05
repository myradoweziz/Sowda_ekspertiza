<template>
	<div class="partners">
		<div class="partners__container __container">
			<div class="partners__title">
				<p>{{ $t('partners') }}</p>
			</div>
			<div class="partners__main">
				<div v-swiper:mySwiper="swiperOptions" :pagination="true" ref="swiperRef" class="partners__swiper swiper">
					<div class="partners__wrapper swiper-wrapper">
						<div v-for="item in sliderImages" class="partners__slide swiper-slide">
							<a :href="item.link" target="_blank" class="partners__image">
								<img :src="`${imgURL}/uploads/partner/${item?.img_path}`" alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import { mapGetters } from 'vuex'

	import { GET_PARTNERS } from '@/api/user.api'

	export default {
		components: { BaseIcon },
		name: 'partners',
		computed: {
			...mapGetters(['imgURL'])
		},
		data() {
			return {
				sliderImages: [],
				swiperOptions: {
					slidesPerView: 6,
					spaceBetween: 25,
					speed: 1300,
					pagination: {
						el: '.partners__bullets-wrapper',
						type: 'bullets',
						clickable: true
					},
					autoplay: {
						delay: 3000
					},
					breakpoints: {
						325: {
							slidesPerView: 2
						},
						768: {
							slidesPerView: 4
						},
						1024: {
							slidesPerView: 5
						}
					}
				}
			}
		},
		async mounted() {
			await this.fetchSlider()
		},
		methods: {
			async fetchSlider() {
				try {
					const { data, status } = await GET_PARTNERS()
					if (status) {
						this.sliderImages = data.data
					}
				} catch (error) {
					console.error(error)
				}
			},
			prevSlide() {
				if (this.mySwiper) {
					this.mySwiper.el.swiper.slidePrev()
				}
			},
			nextSlide() {
				if (this.mySwiper) {
					this.mySwiper.el.swiper.slideNext()
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.partners {
		width: 100%;
		height: 100%;
		max-height: 450px;
		overflow: hidden;
		border-radius: 20px;
		margin-top: 40px;
		@media screen and (max-width: 768px) {
			border-radius: 10px;
			margin-left: 0;
			margin-top: 20px;
		}
		&__title {
			font-family: Inter;
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			padding-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p {
				@media (max-width: 768px) {
					font-size: 14px;
				}
			}
			a {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 12px;
				background-color: transparent;
				span {
					&:nth-child(1) {
						font-size: 20px;
						font-weight: 700;
						line-height: 24px;
						text-align: justify;
						cursor: pointer;
						color: var(--black);
						@media (max-width: 768px) {
							font-size: 12px;
							font-weight: 700;
							line-height: 14.4px;
							text-align: justify;
						}
					}
					&:nth-child(2) {
						color: #05659b;
					}
				}
			}
		}
		// .partners__swiper
		&__main {
			&:deep() {
				.swiper {
					width: 100%;
					overflow: hidden;
					border-radius: 20px;
					@media screen and (max-width: 768px) {
						border-radius: 10px;
					}
				}
				.swiper-container {
					position: relative;
				}
				.swiper-wrapper {
					width: 100%;
					height: 100%;
					z-index: 1;
					display: flex;
					transition-property: transform;
					box-sizing: content-box;
					touch-action: pan-y;
					border-radius: 20px;
					@media screen and (max-width: 768px) {
						border-radius: 10px;
					}
				}
				.swiper-android .swiper-slide,
				.swiper-wrapper {
					transform: translate3d(0px, 0, 0);
					border-radius: 20px;
					@media screen and (max-width: 768px) {
						border-radius: 10px;
					}
				}
				.swiper-horizontal {
					touch-action: pan-y;
				}
				.swiper-slide {
					flex-shrink: 0;
					width: 100%;
					height: 100%;
					position: relative;
					transition-property: transform;
					display: block;
					border-radius: 20px;
					cursor: pointer;
					@media screen and (max-width: 768px) {
						border-radius: 10px;
					}
				}
			}
		}

		&__swiper {
			border-radius: 20px;
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
		}

		// .partners__wrapper

		&__slide {
			height: 100%;
			border-radius: 20px;
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
		}

		// .partners__image

		&__image {
			border-radius: 20px;
			background-color: #fcfcfc;
			max-height: 450px;
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
				@media screen and (max-width: 768px) {
					border-radius: 10px;
				}
			}
		}
		&__bullets {
			position: absolute;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 8px;
			width: max-content !important;
			text-align: left;
			padding: 4px 6px;
			bottom: 30px;
			left: 20px !important;
			transition: all 0.3s ease;
			@media screen and (max-width: 425px) {
				bottom: 9px;
				left: 7px !important;
				padding: 3px 2px;
			}
		}
		&__navigation {
			position: absolute;
			width: max-content !important;
			bottom: 30px;
			right: 20px !important;
			transition: all 0.3s ease;
			display: flex;
			gap: 20px;
			@media screen and (max-width: 425px) {
				bottom: 9px;
				right: 7px !important;
				padding: 3px 2px;
			}
		}

		&__prev {
			width: 34px;
			height: 34px;
			padding: 0px 4px 0px 4px;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.05);
			&:deep() {
				svg {
					fill: #ffff;
				}
			}
			@media screen and (max-width: 425px) {
				width: 25px;
				height: 25px;
			}
		}
		&__next {
			width: 34px;
			height: 34px;
			padding: 0px 4px 0px 4px;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.05);
			&:deep() {
				svg {
					fill: #ffff;
				}
			}
			@media screen and (max-width: 425px) {
				width: 25px;
				height: 25px;
			}
		}

		// .partners__bullets

		&__bullets-wrapper {
			display: flex;
			justify-content: center;
			gap: 10px;
			transition: all 0.3s ease;
			&:deep {
				.swiper-pagination-bullet {
					cursor: pointer;
					width: 9.12px;
					height: 9.12px;
					border-radius: 50%;
					background-color: var(--white);
					transition: all 0.3s ease;
					@media screen and (max-width: 425px) {
						width: 3.51px;
						height: 3.51px;
					}
				}
				.swiper-pagination-bullet-active {
					background-color: #05659b;
					width: 21.84px;
					border-radius: 50px;
					transition: all 0.3s ease;
					@media screen and (max-width: 425px) {
						width: 9px;
					}
				}
			}
		}
	}
</style>
