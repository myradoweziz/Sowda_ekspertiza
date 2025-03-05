<template>
	<div class="end">
		<div class="end__container __container">
			<div class="end__title">{{ $t('accepted') }}</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="scss" scoped>
	.end {
		padding: 80px 0px;
		padding-top: 40px;
		@media (max-width: 768px) {
			padding: 40px 0px;
		}
		&__container {
		}
		&__title {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px 20px;
			background: #fcfcfc;
			border-radius: 10px;
			font-weight: 600;
			font-size: 22px;
			line-height: 24px;
			color: #05659b;
		}
	}
</style>
