<template>
	<div class="about-us">
		<div class="about-us__wrapper">
			<div v-for="item in aboutUs" :key="item.uuid" class="about-us__box">
				<div class="about-us__img-box">
					<div class="about-us__img">
						<img :src="`${imgURL}/uploads/about-us/${item.img_path}`" alt="" />
					</div>
				</div>
				<div class="about-us__title" v-html="normalizeTextByLang(item, 'title')[$i18n.locale]" />
				<div class="about-us__text" v-html="normalizeTextByLang(item, 'text')[$i18n.locale]" />
			</div>
		</div>
	</div>
</template>

<script>
	import { getAboutUs } from '@/api/user.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'default',
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return {
				aboutUs: []
			}
		},
		async mounted() {
			await this.fetchAboutUs()
		},
		methods: {
			async fetchAboutUs() {
				try {
					const { data, status } = await getAboutUs()
					if (status) this.aboutUs = data.data
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
	.about-us {
		max-width: 755.04px;
		height: 100%;
		margin: 0 auto;
		padding: 50px 20px 80px 20px;

		@media (max-width: 425px) {
			padding: 20px 20px 20px 20px;
		}

		&__wrapper {
			width: 100%;
			height: 100%;
		}

		&__box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			@media (max-width: 425px) {
				gap: 10px;
			}
		}

		// .about-us__img

		&__img {
			position: relative;
			padding-top: 58.597883598%;
			border-radius: 10px;
			img {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}

		// .about-us__title

		&__title {
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			text-align: justify;
			color: var(--black);
			@media (max-width: 425px) {
				font-size: 12px;
			}
		}

		// .about-us__text

		&__text {
			font-size: 20px;
			font-weight: 300;
			line-height: 24px;
			text-align: justify;

			@media (max-width: 425px) {
				font-size: 8.31px;
				font-weight: 300;
				line-height: 9.98px;
				text-align: justify;
			}
		}
	}
</style>
