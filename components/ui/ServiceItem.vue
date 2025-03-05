<template>
	<div :class="['service-item', { active: isService }]">
		<div class="service-item__box">
			<div class="service-item__icon">
				<base-icon :name="icon" />
			</div>
			<div class="service-item__title">{{ text }}</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'

	export default {
		components: { BaseIcon },
		props: {
			text: { type: String, default: () => '' },
			icon: { type: String, default: () => '' },
			isService: { type: Boolean, default: false }
		}
	}
</script>

<style lang="scss" scoped>
	.service-item {
		width: 100%;
		height: 100%;
		cursor: pointer;

		&.active {
			.service-item__box {
				min-width: 100%;
			}
		}
		&:hover {
			.service-item__icon {
				color: #fcfcfc;
			}
		}
		// .service-item__box

		&__box {
			min-height: 120px;
			min-width: 320px;
			width: 100%;
			height: 100%;
			padding: 15px 20px;
			padding-bottom: 10px;
			border-radius: 10px;
			background: #fbfbfb;
			transition: 0.3s;
			@media (max-width: 768px) {
				min-height: 100%;
				min-width: 100%;
			}
		}

		// .service-item__icon

		&__icon {
			color: #05659b;
			display: flex;
			justify-content: flex-start;
			padding-bottom: 10px;
			:deep() {
				svg {
					width: 61.95px;
					height: 42.33px;
				}
			}
		}

		// .service-item__title

		&__title {
			width: 100%;
			font-size: 20px;
			font-weight: 600;
			line-height: 24px;
			text-align: left;
			color: #333333;
			@media screen and (max-width: 425px) {
				font-size: 12px;
				font-weight: 600;
				line-height: 15.82px;
				text-align: left;
			}
		}
	}
</style>
