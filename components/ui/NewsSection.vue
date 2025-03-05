<template>
	<div class="news">
		<div class="news__container">
			<div class="news__head">
				<div class="news__head-title">{{ $t('news') }}</div>
				<div @click="goPage" class="news__head-link">
					<span>{{ $t('all') }}</span>
					<base-icon name="west" />
				</div>
			</div>
			<div class="news__cards">
				<news-item v-for="item in news" :key="item.uuid" :item="item" :page="page" :limit="limit" @open="openNewPage" />
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import NewsItem from '@/components/ui/NewsItem.vue'

	import { getNews } from '@/api/user.api'

	export default {
		components: { NewsItem },
		data() {
			return {
				limit: 4,
				page: 0,
				news: []
			}
		},
		async mounted() {
			await this.getAllNews()
		},
		methods: {
			goPage() {
				this.$router.push(this.localeLocation('/news'))
			},
			async getAllNews() {
				try {
					const { data, status } = await getNews({ data: { l: this.limit, p: this.page } })
					if (status) this.news = data.data.news
				} catch (error) {
					console.error(error)
				}
			},
			openNewPage(id) {
				this.$router.push(this.localeLocation(`/news_id/${id}`))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news {
		// .news__head
		padding-top: 30px;
		&__head {
			width: 100%;
			display: flex;
			align-items: center;
			padding-bottom: 20px;
			justify-content: space-between;
		}

		//.news__head-title

		&__head-title {
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			text-align: justify;
			color: var(--black);

			@media (max-width: 768px) {
				font-size: 20px;
				font-size: 12px;
				font-weight: 700;
				line-height: 14.4px;
				text-align: justify;
			}
		}

		//.news__head-link

		&__head-link {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12px;
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

		// .news__cards

		&__cards {
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
