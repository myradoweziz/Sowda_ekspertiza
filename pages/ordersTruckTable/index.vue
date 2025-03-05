<template>
	<div class="table">
		<div class="table__container __container">
			<div class="table__body">
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('fullName') }}:</p>
						<span>{{ form?.contacts.name }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('dateVehicle') }} :</p>
						<span>{{ form?.contacts.date }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('timeVehicle') }}:</p>
						<span>{{ form?.contacts.hours }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('from') }}:</p>
						<span>{{ form?.contacts.from }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('where') }}:</p>
						<span>{{ form?.contacts.to }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('email') }}:</p>
						<span>{{ form?.contacts.email }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('yourNumber') }}:</p>
						<span>{{ form?.contacts.phone }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('orderDuration') }}:</p>
						<span>{{ `${form?.contacts.delay} sagat` }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('typeLoad') }}:</p>
						<span>{{ form?.contacts.typeLoad }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('cargoWeight') }}:</p>
						<span>{{ form?.contacts.cargoWeight }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title">
						<p>{{ $t('note') }}:</p>
						<span>{{ form?.contacts.note }}</span>
					</div>
				</div>
				<div class="table__row">
					<div class="table__title last-td">
						<p>{{ $t('totalPayment') }}:</p>
						<span>{{ `${calculated} TMT` }}</span>
					</div>
				</div>
			</div>
			<div class="table__btn">
				<div class="table__button">
					<Button
						@onClick="fetchSendTruck"
						:text="$t('confirmation')"
						appendIcon="send"
						primary
						padding
						:disabled="loading"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/base/Button.vue'

	import { sendTruckPerson } from '@/api/user.api'

	export default {
		layout: 'default',
		components: { Button },
		computed: {
			calculated() {
				let sum = Math.round(this.form?.contacts.cargoWeight / this.items?.quantity)
				let galyndy = Math.round(this.form?.contacts.cargoWeight % this.items?.quantity)
				if (galyndy != 0) {
					sum = sum + 1
				}
				return sum * this.items?.price * Number(this.form?.contacts.delay)
			},
			amount() {
				return this.calculated * 100
			}
		},
		data() {
			return { form: null, items: null, loading: false }
		},
		async mounted() {
			const getForm = await this.$cookie.get('formTruckTable')
			const getItemsCount = await this.$cookie.get('items')
			this.form = getForm
			this.items = getItemsCount
		},
		methods: {
			async fetchSendTruck() {
				try {
					this.loading = true
					const { data, status } = await sendTruckPerson({
						data: {
							amount: String(this.amount),
							name: this.form.contacts.name,
							email: this.form.contacts.email,
							phone: this.form.contacts.phone,
							go_from: this.form.contacts.from,
							come_to: this.form.contacts.to,
							type_of_cargo: this.form.contacts.typeLoad,
							quantity: Number(this.form.contacts.cargoWeight),
							date: this.form.contacts.date,
							time: this.form.contacts.hours,
							duration: Number(this.form.contacts.delay),
							mark: this.form.contacts.note,
							order_id: this.items.UUID
						}
					})
					if (!data.formUrl) {
						alert('Yalnyslyk yuze cykdy ya-da internet nasazlygy')

						return
					}
					if (status === 200) {
						const link = document.createElement('a')
						link.href = `${data.formUrl}`
						link.setAttribute('target', '_blank')
						document.body.appendChild(link)
						link.click()
						document.body.removeChild(link)
					}
				} catch (error) {
					console.error(error)
					alert('Yalnyslyk yuze cykdy ya-da internet nasazlygy')
				} finally {
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table {
		padding: 60px 0px;
		@media (max-width: 768px) {
			padding: 40px 0px;
		}
		@media (max-width: 425px) {
			padding: 10px 0px;
		}
		&__container {
		}
		&__body {
		}
		&__row {
			padding: 16px 24px;
			border-radius: 10px;
			&:nth-child(odd) {
				background-color: #f1f1f1;
				border-bottom: 1px solid #eaecf0;
			}
		}
		&__title {
			display: flex;
			align-items: center;
			gap: 50px;
			@media (max-width: 425px) {
				flex-wrap: wrap;
				gap: 5px;
			}
			p {
				width: 300px;
				font-size: 16px;
				font-weight: 600;
				line-height: 19.2px;
				text-align: left;
				color: var(--black);
				@media (max-width: 425px) {
					font-size: 14px;
					line-height: 24px;
				}
			}
			span {
				font-size: 16px;
				font-weight: 400;
				line-height: 19.2px;
				text-align: left;
				color: var(--black);
				@media (max-width: 425px) {
					font-size: 16px;
					line-height: 24px;
				}
			}
		}
		&__btn {
			display: flex;
			justify-content: flex-end;
			width: 100%;
			margin-top: 20px;
		}
		&__button {
			@media (max-width: 425px) {
				width: 137px;
				height: 38px;
				button {
					font-size: 14px;
				}
			}
		}
	}
	.last-td {
		p,
		span {
			color: #05659b;
		}
	}
</style>
