<template>
	<div class="contact">
		<div class="contact__wrapper">
			<div class="contact__content">
				<div class="contact__content-back">
					<button @click="$emit('close')">
						<base-icon name="close" />
					</button>
				</div>
				<div class="contact__form-content">
					<div class="contact__form-body">
						<div class="contact__map">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3033.90130029479!2d58.2943205!3d37.8907549!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7003944259cb1d%3A0xafc893357e4b0d2!2sChamber%20of%20Commerce%20and%20Industry%20of%20Turkmenistan!5e1!3m2!1sen!2s!4v1733892188745!5m2!1sen!2s"
								width="600"
								height="450"
								style="border: 0"
								allowfullscreen=""
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
						<form @submit.prevent="sendMessage" class="contact__form">
							<textfield
								class="contact__form-item"
								:title="$t('name')"
								type="text"
								:value="form.name"
								@input="(text) => (form.name = text)"
								:placeholder="$t('name')"
							/>
							<textfield
								class="contact__form-item"
								:title="$t('phone')"
								type="text"
								:value="form.phone"
								@input="(text) => (form.phone = text)"
								:placeholder="$t('phone')"
							/>
							<textfield
								class="contact__form-item"
								:title="$t('email')"
								type="email"
								:value="form.email"
								@input="(text) => (form.email = text)"
								:placeholder="$t('email')"
							/>
						</form>
					</div>
				</div>
				<the-textarea :title="$t('content')" :value.sync="form.message" @input="(text) => (form.message = text)" />
				<div class="contact__form-bottom">
					<div class="contact__form-button">
						<Button @onClick="sendMessage" :text="$t('give')" appendIcon="west" primary />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import Textfield from '@/components/base/Textfield.vue'
	import TheTextarea from '@/components/base/TheTextarea.vue'
	import BaseIcon from '@/components/BaseIcon.vue'

	import { getCities } from '@/api/admin.api'
	import { sendMail } from '@/api/user.api'

	export default {
		components: { Textfield, TheTextarea, Button, BaseIcon },
		data() {
			return {
				cities: [],
				form: { name: '', email: '', message: '', phone: '+993 ' }
			}
		},
		async mounted() {
			await this.getCity()
		},
		methods: {
			async getCity() {
				try {
					const { data, status } = await getCities()
					if (data.data) this.cities = data.data
				} catch (error) {
					console.error(error)
				}
			},
			async sendMessage() {
				try {
					if (this.form.name && this.form.phone && this.form.email) {
						const { data, status } =
							(
								await sendMail({
									data: {
										name: this.form.name,
										phone: this.form.phone,
										email: this.form.email,
										message: this.form.message,
										cities_id: this.cities[0].uuid
									}
								})
							).data || []
						this.form.name = this.form.phone = this.form.email = this.form.message = ''
						if (status) {
							alert('Habar iberildi !')
						}
					} else {
						alert('Ahli meydanlary dolduryn !')
					}
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contact {
		max-width: 994px;
		margin: 0 auto;
		@media (max-width: 425px) {
			width: 100%;
		}
		// .contact__wrapper

		&__wrapper {
			width: 100%;
			height: 673.26px;
			@media (max-width: 425px) {
				height: 100%;
			}
		}

		// .contact__content

		&__content {
			width: 100%;
			padding: 30px;
			background: var(--white);
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		&__content-back {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			button {
				width: 40.09px;
				height: 40.09px;
				padding: 4.31px;
				border-radius: 5.75px;
				background: #fcfcfc;
				display: flex;
				align-items: center;
				justify-content: center;
				@media (max-width: 425px) {
					width: 24.09px;
					height: 24.09px;
					padding: 4.31px;
					&:deep() {
						svg {
							width: 10.09px;
							height: 10.09px;
						}
					}
				}
			}
		}

		&__form-body {
			width: 100%;
			display: flex;
			gap: 20px;
			height: 310.17px;
			@media (max-width: 425px) {
				flex-direction: column;
				width: 100%;
				height: 428.87px;
				gap: 14.61px;
			}
		}

		// .contact__map

		&__map {
			width: 457.5px;
			height: 100%;
			border-radius: 14.36px;
			iframe {
				width: 100%;
				height: 100%;
				border-radius: 14.36px;
			}
			@media (max-width: 425px) {
				width: 100%;
				height: 210.34px;
				border-radius: 9.74px;
				iframe {
					width: 100%;
					height: 100%;
					border-radius: 9.74px;
				}
			}
		}

		// .contact__form-content

		&__form-content {
			width: 100%;
		}

		&__form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 459.65px;
			height: 100%;
			@media (max-width: 768px) {
				width: 100%;
			}
		}

		// .contact__form-item

		&__form-item {
			width: 100%;
		}
		&__form-bottom {
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
		}
		&__form-button {
			width: 139px;
			height: 34px;
		}
	}
</style>
