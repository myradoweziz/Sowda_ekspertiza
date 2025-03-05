<template>
	<div class="banner">
		<div class="banner__container __container">
			<div class="banner__box">
				<div class="banner__img-big">
					<img src="@/assets/img/bannerSvg.svg" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	import { getBanner } from '@/api/user.api'

	export default {
		name: 'banner',
		computed: {
			...mapGetters(['imgURL'])
		},
		data() {
			return {
				banner: null
			}
		},
		async mounted() {
			await this.fetchBanner()
		},
		methods: {
			async fetchBanner() {
				try {
					const { data, status } = await getBanner()
					if (status) {
						this.banner = data.data && data.data[0] && data.data[0]
					}
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		margin-bottom: 40px;
		margin-top: 10px;
		@media (max-width: 768px) {
			margin-bottom: 20px;
		}
		&__box {
			width: 100%;
			height: max-content;
		}

		// .banner__img-big

		&__img-big {
			width: 100%;
			height: max-content;
			background-color: #fcfcfc;
			img {
				border-radius: 10px;
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}

		// .banner__img-mini

		&__img-mini {
			display: none;
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
			@media (max-width: 461px) {
				display: block;
			}
		}
	}
</style>
