<template>
	<div class="about">
		<div class="about__back">
			<img src="@/assets/img/backabout.png" alt="" />
		</div>
		<div class="about__wrapper">
			<div v-for="item in aboutUs" :key="item.uuid" class="about__box __container">
				<div class="about__img-box">
					<div class="about__img">
						<img v-if="item.img_path" :src="`${imgURL}/uploads/about-us/${item.img_path}`" alt="" />
					</div>
				</div>
				<div class="about__content">
					<div
						class="about__title"
						v-if="normalizeTextByLang(item, 'title')[$i18n.locale]"
						v-html="normalizeTextByLang(item, 'title')[$i18n.locale]"
					/>
					<div
						class="about__text"
						v-if="normalizeTextByLang(item, 'text')[$i18n.locale]"
						v-html="normalizeTextByLang(item, 'text')[$i18n.locale]"
					/>
					<div class="about__button">
						<Button @onClick="openPage" :text="$t('readFull')" appendIcon="west" primary />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import Button from '@/components/base/Button.vue'

	import { getAboutUs } from '@/api/user.api'

	import { mapGetters } from 'vuex'

	export default {
		components: { BaseIcon, Button },
		computed: { ...mapGetters(['imgURL']) },
		data() {
			return {
				aboutUs: []
			}
		},
		async mounted() {
			await this.getAbout()
		},
		methods: {
			openPage() {
				this.$router.push(this.localeLocation('/about-us'))
			},
			normalizeTextByLang(dontNormalItem, prefix = 'title') {
				return {
					tm: dontNormalItem[`${prefix}_tm`],
					ru: dontNormalItem[`${prefix}_ru`],
					en: dontNormalItem[`${prefix}_en`]
				}
			},
			async getAbout() {
				try {
					const { data, status } = await getAboutUs()
					if (status) this.aboutUs = data.data
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about {
		// .about__box
		// background: #F8F8F8;
		margin-bottom: 40px;
		position: relative;
		@media (max-width: 768px) {
			margin-bottom: 10px;
		}

		&__wrapper {
			padding: 20px 0px;
		}
		&__back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__box {
			display: flex;
			gap: 70px;
			@media (max-width: 992px) {
				gap: 30px;
				flex-direction: column;
			}
			@media (max-width: 425px) {
				gap: 10px;
				flex-direction: column;
			}
		}

		// .about__img-box

		&__img-box {
			width: 45%;
			border-radius: 6px;
			position: relative;
			@media (max-width: 992px) {
				width: 100%;
			}
		}

		// .about__img-back

		&__img-back {
			position: absolute;
			z-index: -1;
			bottom: calc(100% - 45px);
			left: -300px;
			@media (max-width: 992px) {
				display: none;
			}
		}

		// .about__img

		&__img {
			position: relative;
			padding-top: 57.627118644%;
			border-radius: 6px;
			img {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0px;
				left: 0px;
				border-radius: 6px;
			}
		}

		// .about__content

		&__content {
			display: flex;
			flex-direction: column;
			width: 55%;
			gap: 20px;
			position: relative;
			@media (max-width: 992px) {
				width: 100%;
			}
			@media (max-width: 425px) {
				gap: 10px;
			}
		}

		// .about__content-back

		&__content-back {
			position: absolute;
			left: 30px;
			top: calc(100% + 50px);
			z-index: -1;
			@media (max-width: 992px) {
				display: none;
			}
		}

		// .about__title

		&__title {
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			text-align: justify;
			color: var(--black);

			@media (max-width: 768px) {
				font-size: 20px;
			}
			@media (max-width: 425px) {
				font-size: 12px;
			}
		}

		// .about__text

		&__text {
			font-size: 20px;
			font-weight: 300;
			line-height: 24px;
			text-align: justify;
			display: -webkit-box;
			-webkit-line-clamp: 10;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;

			@media (max-width: 768px) {
				font-size: 14px;
			}
			@media (max-width: 425px) {
				font-size: 8.31px;
				font-weight: 300;
				line-height: 9.98px;
				text-align: justify;
			}
		}

		// .about__button

		&__button {
			width: 139px;
			height: 34px;
		}
	}
</style>
