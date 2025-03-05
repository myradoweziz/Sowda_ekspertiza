<template>
	<div :class="['pop-up', { active: active }]" @click.stop="close">
		<div class="pop-up__wrapper">
			<div class="pop-up__body">
				<pop-up-body-content @close="close">
					<slot></slot>
				</pop-up-body-content>
			</div>
		</div>
	</div>
</template>

<script>
	import PopUpBodyContent from './PopUpBodyContent.vue'

	export default {
		components: {
			PopUpBodyContent
		},
		props: {
			popUpWidth: {
				type: String,
				default: '400'
			},
			active: {
				type: Boolean,
				default: false
			},
			publish: {
				type: Boolean,
				default: false
			},
			notClose: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-up {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		z-index: 100;
		opacity: 0;
		visibility: hidden;
		z-index: 99;
		user-select: none;
		transition: all 0.3s ease;
		&.active {
			opacity: 1;
			z-index: 1000;
			visibility: visible;
			background: rgba(255, 255, 255, 0.6);
			pointer-events: auto;
			.pop-up__body {
				transform: scale(1);
				transition: all 0.3s ease;
			}
		}
		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}

		&::-webkit-scrollbar-track {
			background: #fcfcfc;
			border-radius: 4px;
			padding: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #05659b;
			border-radius: 4px;
			border: 2px solid #fcfcfc;
		}
		&__wrapper {
			width: 100%;
			max-width: 100%;
			flex: 1 0 auto;
			margin: auto 0;
			box-sizing: border-box;
			transition: all 0.2s;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		&__body {
			position: relative;
			transition: all 0.3s ease;
			transform: scale(0);
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
</style>
