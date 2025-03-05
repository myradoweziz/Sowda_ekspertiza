<template>
	<div class="error">
		<div class="error__row">
			<div class="error__title">Meýdançany dogry dolduryň!</div>
			<div @click="closedPopup" class="error__btn">OK</div>
		</div>
	</div>
</template>

<script>
	export default {
		emits: ['close'],
		methods: {
			closedPopup() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.error {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100vh;
		z-index: 5;
		background: rgba(222, 222, 222, 0.5);
		backdrop-filter: blur(2px);
		// .error__row
		&__row {
			position: absolute;
			top: 42%;
			left: 40%;
			background-color: #ffff;
			border-radius: 5px;
			padding: 20px;
		}
		// .error__title
		&__title {
			font-weight: 500;
			font-size: 16px;
			line-height: 24px;
			color: var(--error);
		}
		// .error__btn
		&__btn {
			border-radius: 5px;
			cursor: pointer;
			margin-top: 5px;
			text-align: center;
			padding: 8px 10px;
			font-weight: 500;
			font-size: 16px;
			line-height: 24px;
			background-color: transparent;
			border: 1px solid #a9a3a3;
			color: #a9a3a3;
			transition: 0.3s all ease-in-out;
			&:hover {
				background-color: rgba(222, 222, 222, 0.5);
				color: #05659b;
			}
		}
	}
</style>
