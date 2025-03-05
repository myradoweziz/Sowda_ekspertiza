<template>
	<div @click="openPage" class="news-item">
		<div class="news-item__box">
			<div class="news-item__img">
				<img :src="`${imgURL}/uploads/news/${item.img_path}`" alt="" />
			</div>
			<div class="news-item__title" v-html="normalizeTextByLang(item, 'title')[$i18n.locale]" />
			<div class="news-item__infos">
				<div class="news-item__infos-viewed">
					<div class="news-item__infos-icon">
						<base-icon name="view" />
					</div>
					<div class="news-item__infos-num">{{ `${item.views_count}` }}</div>
				</div>
				<div class="news-item__infos-viewed">
					<div class="news-item__infos-icon">
						<base-icon name="calendarMonth" />
					</div>
					<div class="news-item__infos-num">
						{{ new Date(item.date).toLocaleDateString() }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'

	import { mapGetters } from 'vuex'

	export default {
		computed: { ...mapGetters(['imgURL']) },
		emits: ['open'],
		props: {
			page: { type: Number, default: () => 0 },
			limit: { type: Number, default: () => 3 },
			item: { type: Object, default: () => {} }
		},
		data() {
			return { news: [] }
		},
		methods: {
			openPage() {
				this.$emit('open', this.item.uuid)
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
	.news-item {
		height: 352.02px;
		padding: 10px 10px 20px 10px;
		border-radius: 6.88px;
		background: var(--white);
		cursor: pointer;
		@media (max-width: 768px) {
			height: max-content;
		}
		// .news-item__box

		&__box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 20px;
			@media (max-width: 768px) {
				gap: 10px;
			}
		}

		// .news-item__img

		&__img {
			width: 100%;
			border-radius: 5px;
			padding-top: 60%;
			position: relative;
			img {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0px;
				left: 0px;
				border-radius: 5px;
			}
		}

		// .news-item__title

		&__title {
			font-size: 14px;
			font-weight: 600;
			line-height: 16.8px;
			text-align: left;
			color: var(--black);
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;

			@media (max-width: 425px) {
				font-size: 8px;
				font-weight: 600;
				line-height: 9.6px;
				text-align: left;
			}
		}

		// .news-item__infos

		&__infos {
			display: flex;
			align-items: center;
			justify-content: space-between;
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
			border-radius: 2.75px;
			background: #f9f9f9;

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
			font-size: 10px;
			font-style: italic;
			font-weight: 400;
			line-height: 12px;
			text-align: left;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 4.73px;
				font-style: italic;
				font-weight: 400;
				line-height: 5.68px;
				text-align: left;
			}
		}
	}
</style>
