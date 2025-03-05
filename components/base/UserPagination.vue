<template>
	<ul :class="paginationClasses.ul">
		<li v-if="paginationLabels.prev" :class="`${paginationClasses.li} ${hasFirst ? paginationClasses.liDisable : ''}`">
			<button
				@click="prev"
				:disabled="hasFirst"
				class="pagination__prev"
				:class="`${paginationClasses.button} ${hasFirst ? paginationClasses.buttonDisable : ''}`"
			>
				<BaseIcon name="chevronPrev1" />
			</button>
		</li>

		<li
			v-for="page in items"
			:key="page.label"
			:class="`${paginationClasses.li} ${page.active ? paginationClasses.liActive : ''} ${
				page.disable ? paginationClasses.liDisable : ''
			}`"
		>
			<span v-if="page.disable" :class="`${paginationClasses.button} ${paginationClasses.buttonDisable}`"> ... </span>
			<button
				v-else
				@click="goto(page.label)"
				:class="`${paginationClasses.button} ${page.active ? paginationClasses.buttonActive : ''}`"
			>
				{{ page.label }}
			</button>
		</li>

		<li v-if="paginationLabels.next" :class="`${paginationClasses.li} ${hasLast ? paginationClasses.liDisable : ''}`">
			<button
				@click="next"
				:disabled="hasLast"
				class="pagination__next"
				:class="`${paginationClasses.button} ${hasLast ? paginationClasses.buttonDisable : ''}`"
			>
				<BaseIcon name="chevronNext1" />
			</button>
		</li>
	</ul>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'

	const defaultClasses = {
		ul: 'pagination',
		li: 'pagination__item',
		liActive: 'pagination__item--active',
		liDisable: 'pagination__item--disable',
		button: 'pagination__link',
		buttonActive: 'pagination__link--active',
		buttonDisable: 'pagination__link--disable'
	}
	const defaultLabels = {
		first: '&laquo;',
		prev: '&lsaquo;',
		next: '&rsaquo;',
		last: '&raquo;'
	}

	export default {
		components: { BaseIcon },
		props: {
			modelValue: {
				// current page
				type: Number,
				required: true
			},
			pageCount: {
				// page numbers
				type: Number,
				required: true
			},
			classes: {
				type: Object,
				required: false,
				default: () => ({})
			},
			labels: {
				type: Object,
				required: false,
				default: () => ({})
			}
		},

		data() {
			return {
				paginationClasses: {
					...defaultClasses,
					...this.classes
				},
				paginationLabels: {
					...defaultLabels,
					...this.labels
				}
			}
		},

		mounted() {
			if (this.modelValue > this.pageCount) {
				this.$emit('input', this.pageCount)
			}
		},

		computed: {
			items() {
				let valPrev = this.modelValue > 1 ? this.modelValue - 1 : 1 // for easier navigation - gives one previous page
				let valNext = this.modelValue < this.pageCount ? this.modelValue + 1 : this.pageCount // one next page
				let extraPrev = valPrev === 3 ? 2 : null
				let extraNext = valNext === this.pageCount - 2 ? this.pageCount - 1 : null
				let dotsBefore = valPrev > 3 ? 2 : null
				let dotsAfter = valNext < this.pageCount - 2 ? this.pageCount - 1 : null

				let output = []

				for (let i = 1; i <= this.pageCount; i += 1) {
					if (
						[
							1,
							this.pageCount,
							this.modelValue,
							valPrev,
							valNext,
							extraPrev,
							extraNext,
							dotsBefore,
							dotsAfter
						].includes(i)
					) {
						output.push({
							label: i,
							active: this.modelValue === i,
							disable: [dotsBefore, dotsAfter].includes(i)
						})
					}
				}
				return output
			},

			hasFirst() {
				return this.modelValue === 1
			},

			hasLast() {
				return this.modelValue === this.pageCount
			}
		},

		methods: {
			first() {
				!this.hasFirst && this.$emit('clickPage', 1)
			},
			prev() {
				!this.hasFirst && this.$emit('clickPage', this.modelValue - 1)
			},
			goto(page) {
				this.$emit('clickPage', page)
			},
			next() {
				!this.hasLast && this.$emit('clickPage', this.modelValue + 1)
			},

			last() {
				!this.hasLast && this.$emit('clickPage', this.pageCount)
			}
		}
	}
</script>

<style scoped lang="scss">
	.pagination {
		display: flex;
		width: max-content;
		&__item {
			&:not(:last-child) {
				margin-right: 3px;
			}
			&--active {
			}
			&--disable {
			}
			span {
				fill: #111111;
				&:deep() {
					svg {
						width: 14px;
						height: 14px;
					}
				}
			}
		}
		// .pagination__link
		&__link {
			height: 36px;
			min-width: 36px;
			border-radius: 4px;
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			letter-spacing: 0.4300000071525574px;
			padding: 10px;
			color: #8b909a;
			border: 1px solid #d8d8d8;
			background: #f9f9f9;
			display: flex;
			justify-content: center;
			align-items: center;
			&:hover {
				background-color: #05659b;
				color: #ffff;
				.mdi:nth-of-type(1) {
					display: none;
				}
				.mdi:nth-of-type(2) {
					display: block;
				}
			}
			@media (max-width: 475px) {
				width: 21.97px;
				height: 21.97px;
				padding: 6.1px;
				gap: 3.66px;
				border-radius: 2.44px;
				border: 0.61px;
				font-size: 8.55px;
				font-weight: 500;
				line-height: 10.25px;
				letter-spacing: 0.26246753334999084px;
				text-align: left;
			}
			&--active {
				background-color: #05659b;
				color: #ffff;
			}
			&--disable {
				// background-color: transparent !important;
				color: rgba(216, 216, 216, 1) !important;
				cursor: not-allowed;
				&:hover {
					color: #8b909a;
					background: #f9f9f9;
				}
			}
		}
	}
</style>
