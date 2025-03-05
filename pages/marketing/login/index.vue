<template>
	<div class="login">
		<div class="login__wrapper">
			<div class="login__title">
				<h2>Hoş geldiňiz !</h2>
			</div>
			<form @submit.prevent="handleSubmit" class="login__body">
				<div class="login__logo">
					<base-icon name="logo" />
				</div>
				<textfield
					:value="form.email"
					@input="(text) => (form.email = text)"
					class="top"
					title="Adyňyz"
					type="text"
					placeholder="Adyňyz"
				/>
				<textfield
					:value="form.password"
					@input="(text) => (form.password = text)"
					title="Parol"
					:type="isShow ? 'text' : 'password'"
					placeholder="Parol"
					appendIcon="visibility"
					@appendCliCk="isShow = !isShow"
				/>
				<!-- <div class="login__check">
          <checkbox @toggle="activeCheck = !activeCheck" title="Запомнить меня" :checked="activeCheck" />
        </div> -->
				<div class="login__button">
					<Button text="Girmek" primary padding />
				</div>
			</form>
		</div>
		<the-error v-if="isError" @close="isError = false" />
	</div>
</template>

<script>
	import Button from '@/components/base/Button.vue'
	import Checkbox from '@/components/base/Checkbox.vue'
	import Textfield from '@/components/base/Textfield.vue'
	import BaseIcon from '@/components/BaseIcon.vue'
	import TheError from '@/components/TheError.vue'

	import { login } from '@/api/admin.api'

	export default {
		layout: 'empty',
		components: { Checkbox, BaseIcon, Button, Textfield, TheError },
		middleware: ['auth-admin'],
		data() {
			return {
				activeCheck: false,
				isError: false,
				form: { email: '', password: '' },
				isShow: false
			}
		},
		mounted() {
			this.$cookie.remove('Authorization')
		},
		methods: {
			async handleSubmit() {
				try {
					const { data } = await login({ data: this.form })
					if (data?.data.token) {
						this.$cookie.set('Authorization', data.data.token)
						localStorage.setItem('Authorization', data.data.token)
						this.$router.push(`/marketing`)
					} else {
						this.$router.push(`/marketing/login`)
						this.isError = true
					}
				} catch (err) {
					console.error(err)
					this.$router.push(`/marketing/login`)
					this.isError = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		margin-bottom: 20px;
	}

	.login {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		&__wrapper {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 10px;
		}
		&__title {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 30px;
			h2 {
				font-size: 40px;
				font-weight: 600;
				line-height: 48.41px;
				text-align: center;
				color: #05659b;
			}
		}
		&__body {
			padding: 40px 40px 60px 40px;
			max-width: 530px;
			display: flex;
			flex-direction: column;
			border-radius: 10px;
			border: 1px solid var(--black);
			@media (max-width: 768px) {
				width: 100%;
			}
		}
		&__logo {
			display: flex;
			justify-content: flex-start;
			padding-bottom: 20px;
			@media (max-width: 768px) {
				display: none;
			}
		}
		&__content {
		}
		&__input-text {
		}
		&__text {
			font-weight: 500;
			font-size: 16px;
			line-height: 24px;
			color: var(--text-link);
			padding-top: 20px;
			padding-bottom: 10px;
		}
		&__input {
			input {
				border-radius: 10px;
				border: 1px solid var(--text-link);
				padding: 18px 20px;
				width: 100%;
			}
		}
		&__check {
			display: flex;
			justify-content: flex-end;
			padding-top: 20px;
			padding-bottom: 30px;
		}
		&__button {
			margin-top: 30px;
		}
	}
</style>
