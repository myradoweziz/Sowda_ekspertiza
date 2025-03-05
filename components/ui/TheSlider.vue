<template>
	<div class="swiper-block">
		<div class="swiper-block__main">
			<div v-swiper:mySwiper="swiperOptions" :pagination="true" ref="swiperRef" class="swiper-block__swiper swiper">
				<div class="swiper-block__wrapper swiper-wrapper">
					<div v-for="item in sliderImages" :key="item.image_en" class="swiper-block__slide swiper-slide">
						<div class="swiper-block__image">
							<img
								v-if="item?.image_tm && $i18n.locale === 'tm'"
								:src="`${imgURL}/uploads/slider/${item.image_tm}`"
								alt=""
							/>
							<img
								v-if="item?.image_en && $i18n.locale === 'en'"
								:src="`${imgURL}/uploads/slider/${item.image_en}`"
								alt=""
							/>
							<img
								v-if="item?.image_ru && $i18n.locale === 'ru'"
								:src="`${imgURL}/uploads/slider/${item.image_ru}`"
								alt=""
							/>
						</div>
					</div>
				</div>
				<div class="swiper-block__bullets">
					<div class="swiper-block__bullets-wrapper"></div>
				</div>
				<div class="swiper-block__navigation" v-if="sliderImages?.length > 1">
					<button class="swiper-block__prev swiper-button-prev" @click="prevSlide">
						<base-icon name="chevronPrev" />
					</button>
					<button class="swiper-block__next swiper-button-next" @click="nextSlide">
						<base-icon name="chevronNext" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import { mapGetters } from 'vuex'

	import { getSlider } from '@/api/user.api'

	export default {
		components: { BaseIcon },
		name: 'carrousel',
		computed: {
			...mapGetters(['imgURL'])
		},
		data() {
			return {
				sliderImages: [],
				swiperOptions: {
					slidesPerView: 1,
					spaceBetween: 10,
					speed: 1500,
					pagination: {
						el: '.swiper-block__bullets-wrapper',
						type: 'bullets',
						clickable: true
					},
					autoplay: {
						delay: 3000
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
					const { data, status } = await getSlider()
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
	.swiper-block {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 20px;
		@media screen and (max-width: 768px) {
			border-radius: 10px;
		}
		// .swiper-block__swiper
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

					height: 480px;
					@media (max-width: 768px) {
						height: inherit;
					}
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

		// .swiper-block__wrapper

		&__slide {
			height: 100%;
			border-radius: 20px;
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
		}

		// .swiper-block__image

		&__image {
			background-color: #fcfcfc;
			height: 100%;
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
			img {
				border-radius: 20px;
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
			background: rgba(255, 255, 255, 0.05);
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

		// .swiper-block__bullets

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
