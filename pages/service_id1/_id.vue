<template>
	<div class="big-service">
		<div class="big-service__wrapper">
			<div class="big-service__box">
				<div class="big-service__back" @click="$router.go(-1)">
					<base-icon name="west" />
					<span>{{ $t('goBack') }}</span>
				</div>
				<div class="big-service__title-box">
					<div class="big-service__icon"><BaseIcon name="medal" /></div>
					<div class="big-service__title" v-html="normalizeTextByLang(services, 'title')[$i18n.locale]" />
				</div>
				<div class="big-service__text" v-html="normalizeTextByLang(services, 'text')[$i18n.locale]" />
			</div>
		</div>
	</div>
</template>

<script>
	import { getServicesId } from '@/api/user.api'
	import BaseIcon from '@/components/BaseIcon.vue'

	export default {
		components: { BaseIcon },
		data() {
			return {
				services: {}
			}
		},
		async mounted() {
			await this.fetchService()
		},
		methods: {
			async fetchService() {
				try {
					const { data } = await getServicesId({ data: { id: this.$route.params.id } })
					this.services = data?.data[0]
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
	.big-service {
		max-width: 755.04px;
		height: 100%;
		margin: 0 auto;
		padding: 50px 20px 80px 20px;

		@media (max-width: 425px) {
			padding: 20px 20px 20px 20px;
		}
		// .big-service__container

		&__wrapper {
			width: 100%;
			height: 100%;
		}

		// .big-service__back
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
		// .big-service__box

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

		// .big-service__title-box

		&__title-box {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 10px;
			flex-direction: column;
			width: 100%;
			height: 103px;
			padding: 10px 20px;
			gap: 10px;
			border-radius: 10px;
			background: #fcfcfc;
		}

		// .big-service__icon

		&__icon {
			width: 61.95px;
			height: 42.33px;
			@media (max-width: 425px) {
				width: 61.95px;
				height: 42.33px;
			}
			&:deep() {
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}

		// .big-service__title

		&__title {
			font-size: 20px;
			font-weight: 600;
			line-height: 24px;
			text-align: left;
			color: var(--black);
		}

		// .big-service__text

		&__text {
			font-family: Inter;
			font-size: 20px;
			font-weight: 400;
			line-height: 24px;
			text-align: justify;
			color: #333333;
			@media (max-width: 425px) {
				font-size: 15px;
				font-weight: 400;
				line-height: 18px;
			}
		}
	}
</style>
