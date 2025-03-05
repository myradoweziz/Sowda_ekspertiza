<template>
	<div class="popup">
		<div class="popup__container __container">
			<div class="popup__content">
				<div :class="['popup__box', { active: travel }]">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			travel: { type: Boolean, default: false }
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--blur);
		backdrop-filter: blur(5px);
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 100;
		&__container {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__box {
			padding: 40px 50px;
			background-color: var(--white);
			display: flex;
			flex-direction: column;
			max-height: calc(100% - 100px);
			overflow: auto;
			&::-webkit-scrollbar {
				width: 8px;
			}

			/* Track */
			&::-webkit-scrollbar-track {
				background: #f1f1f1;
			}

			/* Handle */
			&::-webkit-scrollbar-thumb {
				background: #05659b;
			}

			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background: #555;
			}
			&.active {
				width: 680px;
			}
		}
	}
</style>
