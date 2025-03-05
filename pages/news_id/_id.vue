<template>
	<div class="inner-news">
		<div class="inner-news__container __container">
			<div class="inner-news__backs">
				<div class="inner-news__back" @click="$router.go(-1)">
					<base-icon name="west" />
					<span>{{ $t('goBack') }}</span>
				</div>
				<div class="inner-news__infos">
					<div class="inner-news__infos-viewed">
						<div class="inner-news__infos-icon">
							<base-icon name="view" />
						</div>
						<div class="inner-news__infos-num" v-if="selectedNews?.views_count">
							{{ `${selectedNews.views_count || ''}` }}
						</div>
					</div>
					<div class="inner-news__infos-viewed">
						<div class="inner-news__infos-icon">
							<base-icon name="calendarMonth" />
						</div>
						<div class="inner-news__infos-num" v-if="selectedNews?.date">
							{{ new Date(selectedNews.date).toLocaleDateString() || '' }}
						</div>
					</div>
				</div>
			</div>
			<div class="inner-news__top">
				<div class="inner-news__title" v-html="normalizeTextByLang(selectedNews, 'title')[$i18n.locale]" />
				<div class="inner-news__content">
					<div class="inner-news__img-box">
						<div class="inner-news__img">
							<img v-if="selectedNews.img_path" :src="`${imgURL}/uploads/news/${selectedNews?.img_path}`" alt="" />
						</div>
					</div>
					<div class="inner-news__text" v-html="normalizeTextByLang(selectedNews, 'text')[$i18n.locale]" />
				</div>
			</div>
			<div class="inner-news__bottom">
				<div class="inner-news__bottom-title">{{ $t('canRead') }}</div>
				<div class="inner-news__bottom-news">
					<news-item
						v-for="item in news.filter((item) => item.uuid !== this.$route.params.id)"
						:key="item.uuid"
						@open="openNewPage"
						:item="item"
						:page="page"
						:limit="limit"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NewsItem from '@/components/ui/NewsItem.vue'

	import { getNews, getNewsId } from '@/api/user.api'
	import { mapGetters } from 'vuex'
	export default {
		components: { NewsItem },
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return { limit: 5, page: 0, news: [], selectedNews: {} }
		},
		async mounted() {
			await this.getAllNews(), await this.fetchNews()
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		},
		methods: {
			async fetchNews() {
				try {
					const { data, status } = await getNewsId({ data: { id: this.$route.params.id } })
					if (status) this.selectedNews = data.data
				} catch (error) {
					console.error(error)
				}
			},
			openNewPage(id) {
				this.$router.push(this.localeLocation(`/news_id/${id}`))
			},
			async getAllNews() {
				try {
					const { data, status } = await getNews({ data: { l: this.limit, p: this.page } })
					if (status) this.news = data.data.news
				} catch (error) {
					console.error(error)
				}
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
	.inner-news {
		padding: 60px 0px;
		@media (max-width: 768px) {
			padding: 40px 0px;
		}
		@media (max-width: 425px) {
			padding: 10px 0px;
		}
		// .inner-news__container

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

		&__infos {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 20px;
		}

		// .news-item__infos-viewed

		&__infos-viewed {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 4px;
		}

		// .news-item__infos-icon

		&__infos-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 28px;
			height: 28px;
			padding: 4px;
			border-radius: 2.75px 0px 0px 0px;
			background: #fcfcfc;
			span {
				&:deep() {
					svg {
						width: 20px;
						height: 20px;
						@media (max-width: 425px) {
							width: 8.68px;
							height: 5.91px;
						}
					}
				}
			}
			@media (max-width: 425px) {
				width: 13.25px;
				height: 13.25px;
				padding: 1.89px 0px 0px 0px;
				border-radius: 1.3px 0px 0px 0px;
			}
		}

		// .news-item__infos-num

		&__infos-num {
			font-size: 20px;
			font-style: italic;
			font-weight: 400;
			line-height: 24px;
			text-align: left;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 14.27px;
				font-style: italic;
				font-weight: 400;
				line-height: 17.13px;
				text-align: left;
			}
		}
		// .inner-news__top

		&__top {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__content {
			width: 100%;
			height: max-content;
		}

		// .inner-news__img-back

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

		// .inner-news__img

		&__img {
			position: relative;
			padding-top: 58.725341426%;
			border-radius: 5px;
			img {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}

		// .inner-news__title

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

		// .inner-news__text

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

		// .inner-news__bottom

		&__bottom {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 40px;
			@media (max-width: 425px) {
				margin-top: 0px;
			}
		}

		// .inner-news__bottom-title

		&__bottom-title {
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			text-align: justify;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 12px;
				line-height: 14.4px;
				text-align: justify;
			}
		}

		// .inner-news__bottom-news

		&__bottom-news {
			display: grid;
			column-gap: 10px;
			grid-template-columns: repeat(4, 1fr);
			@media (max-width: 900px) {
				grid-template-columns: repeat(3, 1fr);
			}
			@media (max-width: 600px) {
				grid-template-columns: repeat(2, 1fr);
				column-gap: 5px;
			}
		}
	}
</style>
