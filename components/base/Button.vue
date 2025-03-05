<template>
	<button :class="classes" @click="$emit('onClick')" :disabled="disabled">
		<span v-if="prependIcon" class="button__prepend-icon">
			<BaseIcon :name="prependIcon" />
		</span>
		<span v-if="text" class="button__content">{{ text }}</span>
		<span v-if="appendIcon" class="button__append-icon">
			<BaseIcon :name="appendIcon" />
		</span>
	</button>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	export default {
		emits: ['onClick'],
		components: { BaseIcon },
		props: {
			text: { type: String, default: () => '' },
			color: { type: String, default: () => '' },
			appendIcon: { type: String, default: () => '' },
			prependIcon: { type: String, default: () => '' },
			onlyIcon: { type: Boolean, default: () => false },
			secondary: { type: Boolean, default: () => false },
			primary: { type: Boolean, default: () => false },
			border10: { type: Boolean, default: () => false },
			padding: { type: Boolean, default: () => false },
			disabled: { type: Boolean, default: () => false }
		},
		computed: {
			classes() {
				return [
					'button',
					{
						button__noneBg: this.onlyIcon,
						'button--border_radius-10': this.border10,
						'button--primary': this.primary,
						'button--secondary': this.secondary,
						'button--padding': this.padding,
						'button--disabled': this.disabled
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 5px 4px 5px 4px;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 300;
		line-height: 16.8px;
		text-align: justify;
		color: var(--white);
		transition: 0.3s;
		@media screen and (max-width: 425px) {
			font-size: 9.01px;
			font-weight: 500;
			line-height: 10.81px;
			text-align: justify;
			padding: 3.22px 2.57px 3.22px 2.57px;
			gap: 6.43px;
			border-radius: 2.57px;
		}
		&:hover {
			background-color: var(--button-hover);
		}
		&--secondary {
			background-color: var(--text);
			&:hover {
				background-color: var(--text-2);
			}
		}
		&--padding {
			padding: 13px 10px;
		}
		&--border_radius-10 {
			padding: 15px;
			border-radius: 10px;
		}
		&--primary {
			background-color: #05659b;

			&:hover {
				background-color: #3293cb;
			}
		}
		&--disabled {
			opacity: 0.5;
			cursor: not-allowed;
			user-select: none;
		}
		&__noneBg {
			background-color: transparent;
			&:hover {
				background-color: transparent;
			}
		}
		// .button__prepend-icon

		&__prepend-icon {
		}

		// .button__content

		&__content {
		}

		// .button__append-icon

		&__append-icon {
			&:deep() {
				svg {
					width: 15.44px;
					height: 15.44px;
				}
			}
		}
	}
</style>
