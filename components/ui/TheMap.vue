<template>
	<section class="map">
		<div class="map__back">
			<img src="@/assets/img/backabout.png" alt="" />
		</div>
		<div class="map__container __container">
			<div class="map__image">
				<map-svg
					@clickedBalkan="changeWordsToBalkan"
					@clickedAhal="changeWordsToAhal"
					@clickedDasoguz="changeWordsToDasoguz"
					@clickedLebap="changeWordsToLebap"
					@clickedMary="changeWordsToMary"
				/>
			</div>
			<div class="map__content">
				<div class="map__title">{{ $t(title) }}</div>
				<div class="map__buttons">
					<button v-for="item in buttons" :key="item.desc">
						<div class="map__icon">
							<base-icon :name="item.icon" />
						</div>
						<div class="map__name">{{ $t(item.title) }}</div>
						<div class="map__desc">{{ $t(item.desc) }}</div>
						<div v-if="item.email" class="map__desc">{{ item.email }}</div>
						<div class="map__desc">{{ item.faks }}</div>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import MapSvg from '@/components/MapSvg.vue'

	export default {
		components: { BaseIcon, MapSvg },
		name: 'map',
		data() {
			return {
				title: 'mapTitle',
				buttons: [
					{ title: 'addressMap', icon: 'location', desc: 'mapAddress' },
					{ title: 'emailMap', icon: 'email', desc: 'trading@sanly.tm' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '(+99312) 39-89-40',
						faks: `(+99312) 39 88 42-43`
					}
				]
			}
		},
		methods: {
			changeWordsToBalkan() {
				this.title = 'bnTitle'
				this.buttons = [
					{ title: 'addressMap', icon: 'location', desc: 'bnAddress' },
					{ title: 'emailMap', icon: 'email', desc: '11@cci.gov.tm' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '(+993 243) 6-08-36, 6-08-37'
					}
				]
			},
			changeWordsToDasoguz() {
				this.title = 'dzTitle'
				this.buttons = [
					{ title: 'addressMap', icon: 'location', desc: 'dzAddress' },
					{ title: 'emailMap', icon: 'email', desc: '13@cci.gov.tm' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '2-53-19'
					}
				]
			},
			changeWordsToLebap() {
				this.title = 'lbTitle'
				this.buttons = [
					{ title: 'addressMap', icon: 'location', desc: 'lbAddress' },
					{ title: 'emailMap', icon: 'email', desc: '14@cci.gov.tm', email: 'tpplb@mail.ru' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '3-38-59; 3-18-53'
					}
				]
			},
			changeWordsToMary() {
				this.title = 'mrTitle'
				this.buttons = [
					{ title: 'addressMap', icon: 'location', desc: 'mrAddress' },
					{ title: 'emailMap', icon: 'email', desc: '15@cci.gov.tm' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '(8522)7-19-78'
					}
				]
			},
			changeWordsToAhal() {
				this.title = 'ahTitle'
				this.buttons = [
					{ title: 'addressMap', icon: 'location', desc: 'ahAddress' },
					{ title: 'emailMap', icon: 'email', desc: 'info@cci.gov.tm' },
					{ title: 'workingHoursMap', icon: 'accessTime', desc: '9:00-18:00' },
					{
						title: 'phoneNumberMap',
						icon: 'call',
						desc: '(+99312) 39 89 81'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map {
		position: relative;
		margin-top: 150px;
		@media (max-width: 768px) {
			margin-top: 40px;
		}
		// .map__back
		&__back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		// .map__container
		&__container {
			display: flex;
			justify-content: space-between;
			gap: 50px;
			@media (max-width: 1150px) {
				gap: 20px;
				flex-wrap: wrap;
				justify-content: center;
			}
			@media (max-width: 768px) {
				padding-bottom: 50px;
			}
		}

		// .map__image
		&__image {
			position: relative;
			&:deep(svg) {
				@media (max-width: 1150px) {
					width: 100%;
				}
			}
		}
		// .map__content
		&__content {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			@media (max-width: 1150px) {
				align-items: center;
				padding-bottom: 50px;
			}
		}
		// .map__title
		&__title {
			font-family: Inter;
			font-size: 30px;
			font-weight: 700;
			line-height: 36px;
			text-align: center;
			color: #05659b;

			padding-bottom: 30px;
			@media (max-width: 768px) {
				font-size: 16px;
				line-height: 30px;
			}
		}
		// .map__buttons
		&__buttons {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
			margin-right: 20px;

			@media (max-width: 768px) {
				grid-template-columns: repeat(1, 1fr);
				justify-items: center;
				margin-right: 0;
			}
			button {
				border: 1px solid #05659b;

				border-radius: 10px;
				background-color: transparent;
				padding: 0 25px;
				padding-bottom: 5px;
				max-width: 270px;
				@media (max-width: 768px) {
					max-width: 100%;
					width: 100%;
					padding: 3px 20px;
				}
			}
		}
		// .map__icon
		&__icon {
			color: #05659b;
		}
		// .map__name
		&__name {
			font-family: Inter;
			font-size: 18px;
			font-weight: 700;
			line-height: 21.6px;
			color: #05659b;
			padding-bottom: 5px;
		}
		// .map__desc
		&__desc {
			font-family: Inter;
			font-size: 18px;
			font-weight: 300;
			line-height: 21.6px;
			text-align: center;
		}
	}
</style>
