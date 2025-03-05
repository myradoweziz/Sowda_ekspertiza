<template>
	<div class="big-service">
		<div class="big-service__container __container">
			<div class="big-service__box">
				<div class="big-service__back" @click="$router.go(-1)">
					<base-icon name="west" />
					<span>{{ $t('goBack') }}</span>
				</div>
				<div class="big-service__title-box">
					<div class="big-service__icon"><BaseIcon name="truck" /></div>

					<div class="big-service__title" v-html="normalizeTextByLang(services, 'title')[$i18n.locale]" />
				</div>
				<div class="big-service__image">
					<img src="@/assets/img/category1.png" alt="" />
				</div>
				<div class="big-service__text" v-html="normalizeTextByLang(services, 'text')[$i18n.locale]" />
				<div class="big-service__images">
					<img src="@/assets/img/category2.png" alt="" />
					<img src="@/assets/img/category3.png" alt="" />
					<img src="@/assets/img/category4.png" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getServicesId } from '@/api/user.api'

	export default {
		data() {
			return {
				services: {
					title_tm: 'Mebel sehiniň hyzmatlary',
					title_ru: 'Услуги мебельного сектора',
					title_en: ' Services of the furniture sector',
					text_tm:
						'Türkmenistanyň Söwda-senagat edarasynyň “Söwda öýi” jemgyýetçilik birleşiginiň kärhanasy ýokary hilli kepillikli, islege görä dizaýnly ähli mebel hyzmatlaryny Size hödürleýär. Sergi we ýarmarkalarynda stendleri döwrebap we talaba laýyk her dürli ölçeglerde we her dürli görnüşlere görâ ýasap bermek, gurnamak we sökmek işleri ýerine ýetirýär.',
					text_ru:
						'Карьерный центр Ассоциации предпринимателей «Дом торговли» Торгово-промышленной палаты Туркменистана предлагает Вам все виды услуг по дизайну и производству мебели высокого качества. Мы выполняем работы по изготовлению, монтажу и ремонту стендов на выставках и ярмарках любых размеров и любых видов.',
					text_en:
						'The Career Center of the Association of Entrepreneurs "Trading House" of the Chamber of Commerce and Industry of Turkmenistan offers you all kinds of high-quality furniture design and production services. We carry out work on the manufacture, installation and repair of stands at exhibitions and fairs of any size and any kind.'
				}
			}
		},
		mounted() {
			this.fetchService()
		},
		methods: {
			async fetchService() {
				try {
					const { data, status } = await getServicesId({ data: { id: this.$route.params.id } })
					if (status) this.services = data?.data[0]
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

		&__image {
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__images {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 20px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
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
			width: 49px;
			height: 43.52px;
			color: #05659b;
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
