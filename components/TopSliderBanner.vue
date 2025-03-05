<template>
	<div class="top-banner">
		<div class="top-banner__wrapper __container">
			<div class="top-banner__body">
				<div class="top-banner__left">
					<the-slider />
				</div>
				<div class="top-banner__right">
					<div class="top-banner__sygar">
						<img :src="img" alt="banner" v-if="img" />
					</div>
					<div
						class="top-banner__news"
						v-if="mainNews && mainNews.length > 0"
						@click.stop="$router.push(localeLocation(`/main-news_id/${mainNews[0]?.uuid}`))"
					>
						<img :src="`${imgURL}/uploads/news/${mainNews[0]?.img_path}`" alt="banner" />
						<div class="top-banner__items">
							<nuxt-link to="/news">{{ $t('news') }}</nuxt-link>
							<div class="top-banner__item">
								<span></span>
								<p v-html="normalizeTextByLang(mainNews[0], 'title')[$i18n.locale]"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<news-section />
			<services />
		</div>
	</div>
</template>

<script>
	import { getMainNews, getShygar } from '@/api/user.api'
	import Services from '@/components/ui/Services.vue'
	import TheSlider from '@/components/ui/TheSlider.vue'
	import { mapGetters } from 'vuex'
	import NewsSection from './ui/NewsSection.vue'

	export default {
		components: {
			TheSlider,
			Services,
			NewsSection
		},
		data() {
			return {
				width: 375,
				img: '',
				mainLogo: '',
				mainNews: null,
				responsive: true
			}
		},
		computed: { ...mapGetters(['imgURL']) },
		async mounted() {
			await this.getMainLogo()
			await this.getMainNews()
			this.windowWidth()
			window.addEventListener('resize', () => this.windowWidth())
		},

		beforeDestroy() {
			window.removeEventListener('resize', () => this.windowWidth())
		},

		methods: {
			windowWidth() {
				if (window.innerWidth <= this.width) {
					this.img = require(`@/assets/img/sygar2.png`)
				} else {
					this.img = this.mainLogo
				}
				if (window.innerWidth <= 425) {
					this.responsive = false
				} else {
					this.responsive = true
				}
			},
			normalizeTextByLang(dontNormalItem, prefix = 'title') {
				return {
					tm: dontNormalItem[`${prefix}_tm`],
					ru: dontNormalItem[`${prefix}_ru`],
					en: dontNormalItem[`${prefix}_en`]
				}
			},
			async getMainLogo() {
				try {
					const { data, status } = await getShygar()
					this.img = `${this.imgURL}/uploads/logo/${data?.data[0]?.image_path}`
					this.mainLogo = `${this.imgURL}/uploads/logo/${data?.data[0]?.image_path}`
				} catch (error) {
					console.error(error)
				}
			},
			async getMainNews() {
				try {
					const { data, status } = await getMainNews()
					this.mainNews = data.data
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-banner {
		position: relative;
		max-width: 100%;

		&__wrapper {
			flex: 1 1;
			padding-top: 40px;
			@media screen and (max-width: 768px) {
				padding-top: 10px;
			}
		}
		&__body {
			display: flex;
			gap: 20px;
			position: relative;
			@media screen and (max-width: 375px) {
				flex-direction: column;
				gap: 5px;
			}
		}
		&__left {
			width: 59.5%;
			@media screen and (max-width: 375px) {
				width: 100%;
			}
		}
		&__right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 20px;
			flex: 1 1 auto;
			@media screen and (max-width: 375px) {
				flex-direction: row-reverse;
				width: 100%;
				justify-content: flex-end;
				gap: 10px;
			}
		}
		&__sygar {
			border-radius: 20px;
			overflow: hidden;
			padding-top: 30.508474576%;
			position: relative;
			background-color: #fcfcfc;
			img {
				position: absolute;
				border-radius: 20px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
				@media screen and (max-width: 768px) {
					border-radius: 10px;
				}
			}
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
			@media screen and (max-width: 375px) {
				padding-top: 41.5%;
				width: 41.5%;
			}
		}

		&__news {
			border-radius: 20px;
			overflow: hidden;
			padding-top: 56.237288136%;
			position: relative;
			background-color: #fcfcfc;
			cursor: pointer;
			img {
				position: absolute;
				z-index: 1;
				border-radius: 20px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
				@media screen and (max-width: 768px) {
					border-radius: 10px;
				}
			}
			@media screen and (max-width: 768px) {
				border-radius: 10px;
			}
			@media screen and (max-width: 375px) {
				padding-top: 0%;
				width: 96.5%;
			}
		}

		&__items {
			position: absolute;
			bottom: 20px;
			left: 20px;
			z-index: 2;
			width: 90.987152034%;
			display: flex;
			flex-direction: column;
			@media screen and (max-width: 768px) {
				left: 5px;
				bottom: 5px;
			}
			a {
				width: 82px;
				padding: 9px 5px 9px 5px;
				border-radius: 4px 4px 0px 0px;
				background: var(--green);
				font-size: 16px;
				font-style: italic;
				font-weight: 400;
				line-height: 19.2px;
				text-align: center;
				color: var(--white);
				&:hover {
					text-decoration: underline;
				}
				@media screen and (max-width: 768px) {
					width: 31.54px;
					padding: 3.46px 1.92px 3.46px 1.92px;
					border-radius: 1.54px;
					font-size: 6.15px;
					font-style: italic;
					font-weight: 400;
					line-height: 7.38px;
					text-align: left;
				}
			}
		}
		&__item {
			width: 100%;
			height: max-content;
			padding: 20px 10px 20px 10px;
			border-radius: 0px 10px 10px 10px;
			// background: rgba(255, 255, 255, 0.2);
			background: #00000033;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			@media screen and (max-width: 768px) {
				padding: 7.69px 3.85px 7.69px 3.85px;
				border-radius: 5px;
			}

			span {
				width: 4px;
				height: 42.25px;
				border-radius: 10px 0px 0px 0px;
				background: var(--green);
				@media screen and (max-width: 768px) {
					width: 1.52px;
					height: 16.25px;
					border-radius: 3.85px;
				}
			}

			p {
				font-size: 18px;
				font-weight: 300;
				line-height: 21.6px;
				text-align: left;
				color: var(--white);
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;

				@media screen and (max-width: 768px) {
					font-size: 6.92px;
					font-weight: 300;
					line-height: 8.31px;
					text-align: left;
				}
			}
		}
	}
</style>
