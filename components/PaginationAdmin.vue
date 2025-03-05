<template>
	<div class="admin-pagination">
		<ul :class="paginationClasses.ul">
			<li
				v-for="page in items"
				:key="page.label"
				:class="`${paginationClasses.li} ${page.active ? paginationClasses.liActive : ''} ${
					page.disable ? paginationClasses.liDisable : ''
				}`"
			>
				<button
					v-if="!page.disable"
					@click="goto(page.label)"
					:class="`${paginationClasses.number} ${page.active ? paginationClasses.numberActive : ''}`"
				>
					{{ page.label }}
				</button>
				<span v-else :class="`${paginationClasses.number} ${paginationClasses.numberDisable}`"> ... </span>
			</li>
		</ul>
	</div>
</template>

<script>
	const defaultClasses = {
		ul: 'pagination',
		li: 'pagination__item',
		liActive: 'pagination__item--active',
		liDisable: 'pagination__item--disable',
		button: 'pagination__link',
		number: 'pagination__number',
		numberActive: 'pagination__number--active',
		numberDisable: 'pagination__number--disable',
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
		props: {
			pageCount: { type: Number, required: true },
			classes: { type: Object, required: false, default: () => ({}) },
			labels: { type: Object, required: false, default: () => ({}) }
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

<style lang="scss" scoped>
	.admin-pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.pagination {
		display: flex;
		// padding: 9px;
		// .pagination__item
		&__item {
			&:not(:last-child) {
				margin-right: 4px;
			}
			&--active {
			}
			&--disable {
			}
			span {
			}
		}
		// .pagination__link
		&__link {
			min-width: 24px;
			padding: 10px;
			border-radius: 4px;
			font-weight: 400;
			font-size: 16px;
			line-height: 120%;
			background-color: var(--pagination-back);
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--text-2);
			&:hover {
				color: #05659b;
			}
			&--active {
				color: #05659b;
			}
			&--disable {
				color: var(----pagination-disable) !important;
			}
		}
		&__number {
			height: 36px;
			min-width: 24px;
			padding: 10px;
			border-radius: 4px;
			font-weight: 400;
			font-size: 12px;
			line-height: 15px;
			background-color: var(--pagination-back);
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--text-2);
			transition: 0.3s;
			&:hover {
				color: var(--white);
				background-color: #05659b;
			}
			&--active {
				color: var(--white);
				background-color: #05659b;
			}
			&--disable {
				color: var(--pagination-disable);
				background-color: var(--pagination-back) !important;
			}
		}
	}
</style>
