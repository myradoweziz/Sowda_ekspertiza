<template>
	<div class="header">
		<div class="header__top">
			<div class="header__top-container __container">
				<div class="header__right">
					<div :class="['menu__burger', { active: isBurger }]" @click="showBurgerMenu">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="header__langs">
						<nuxt-link
							v-for="locale in availableLocales"
							:key="locale.code"
							exact
							:to="switchLocalePath(locale.code)"
							class="header__lang"
						>
							{{ locale.name }}
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
		<div class="header__logo __container">
			<nuxt-link to="/">
				<base-icon name="logo" />
				<p>{{ $t('mapTitle') }}</p>
			</nuxt-link>

			<div class="header__year-logo">
				<p>Halkara parahatçylyk we ynanyşmak ýyly</p>
				<img src="@/assets/img/2025.png" alt="" />
			</div>
		</div>
		<div class="header__bottom">
			<div class="header__bottom-container __container">
				<div :class="['header__menu menu', { active: isBurger }]">
					<div class="menu__body">
						<ul class="menu__list">
							<li v-for="item in menus && menus?.slice(0, 3)" :key="item.id" class="menu__item">
								<nuxt-link
									:to="localePath(item.link)"
									exact
									:class="[
										'menu__link',
										{
											'nuxt-link-exact-active':
												item.id === 2 &&
												($route.name === `service_id1-id___${$i18n.locale}` ||
													$route.name === `service_id2-id___${$i18n.locale}` ||
													$route.name === `service_id3-id___${$i18n.locale}` ||
													$route.name === `service_id4-id___${$i18n.locale}`)
										}
									]"
									>{{ $t(item.name) }}</nuxt-link
								>
							</li>
							<!-- <li
								@click="toggle"
								:class="[
									'menu__item-service',
									{ active: isService },
									{
										_active:
											$route.name === `baherden___${$i18n.locale}` ||
											$route.name === `kaka___${$i18n.locale}` ||
											$route.name === `busPassengers___${$i18n.locale}` ||
											$route.name === `passenger___${$i18n.locale}`
									}
								]"
							>
								<div class="menu__item-service-box">
									<div class="menu__link_service">{{ $t('company') }}</div>
									<base-icon name="chevronDown" class="menu__icon" />
								</div>
								<ul class="menu__sub-list">
									<li v-for="item in services" :key="item.id" class="menu__sub-item">
										<nuxt-link exact :to="localePath(item.path)" class="menu__sub-link">{{ item.name }}</nuxt-link>
									</li>
								</ul>
							</li> -->
							<li v-for="item in menus && menus?.slice(3)" :key="item.id" class="menu__item">
								<nuxt-link
									:to="localePath(item.link)"
									exact
									:class="[
										'menu__link',
										{
											'nuxt-link-exact-active':
												(item.id === 5 && $route.name === `news_id-id___${$i18n.locale}`) ||
												(item.id === 7 &&
													($route.name === `ordersCars___${$i18n.locale}` ||
														$route.name === `personalOrders___${$i18n.locale}` ||
														$route.name === `personalTruckOrders___${$i18n.locale}` ||
														$route.name === `ordersCarTypesFiziki___${$i18n.locale}` ||
														$route.name === `ordersCarTypesBudget___${$i18n.locale}` ||
														$route.name === `ordersCarTypesTruckYuridiki___${$i18n.locale}` ||
														$route.name === `ordersCarTypesTruckFiziki___${$i18n.locale}` ||
														$route.name === `ordersContact___${$i18n.locale}` ||
														$route.name === `ordersBudgetContact___${$i18n.locale}` ||
														$route.name === `ordersTruckContact___${$i18n.locale}` ||
														$route.name === `ordersTruckContact___${$i18n.locale}` ||
														$route.name === `ordersTruckYuridikiContact___${$i18n.locale}` ||
														$route.name === `ordersBudgetBrunchContact___${$i18n.locale}`))
										}
									]"
									>{{ $t(item.name) }}</nuxt-link
								>
							</li>
						</ul>
					</div>
					<div @click="openLocale" :class="['menu__lang', { active: isActive }]">
						<!-- <div class="menu__lang-btn">
              <nuxt-link v-for="locale in selectedLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                {{ locale.name }}
              </nuxt-link>
              <base-icon name="chevronDown" />
            </div> -->
						<div v-if="isBurger" class="menu__lang-dropdown">
							<div style="display: flex; gap: 5px">
								<nuxt-link
									v-for="locale in localeBurger"
									exact
									:key="locale.code"
									:to="switchLocalePath(locale.code)"
									class="menu__lang-item"
								>
									{{ locale.name }}
								</nuxt-link>
							</div>
						</div>
						<!-- <div v-else class="menu__lang-dropdown">
              <nuxt-link
                v-for="locale in availableLocales"
                :key="locale.code"
                exact
                :to="switchLocalePath(locale.code)"
                class="menu__lang-item"
              >
                {{ locale.name }}
              </nuxt-link>
            </div> -->
					</div>
				</div>
				<button @click="showContact" class="header__contact">
					<base-icon name="contact" />
					<p>Habarlaşmak</p>
				</button>
			</div>
		</div>
		<pop-up-body :active="isContact" v-if="isContactBefore" @close="closeContact">
			<contact-us @close="closeContact"></contact-us>
		</pop-up-body>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import PopUpBody from '@/components/PopUpBody.vue'
	import ContactUs from '@/components/ui/ContactUs.vue'

	export default {
		components: { BaseIcon, PopUpBody, ContactUs },
		computed: {
			availableLocales() {
				return this.$i18n.locales
			},
			localeBurger() {
				return this.$i18n.locales.filter((i) => i.code)
			},
			selectedLocales() {
				return this.$i18n.locales.filter((i) => i.code === this.$i18n.locale)
			}
		},
		data() {
			return {
				isActive: false,
				isBurger: false,
				isService: false,
				isActiveId: 0,
				isContact: false,
				isContactBefore: false,
				services: [
					{ id: 1, name: 'Bäherden', path: '/baherden' },
					{ id: 2, name: 'Kaka', path: '/kaka' }
				],
				menus: [
					{ id: 0, name: 'homePage', link: '/' },
					{ id: 1, name: 'about', link: '/about-us' },
					{ id: 2, name: 'our', link: '/services' },
					// { id: 4, name: 'regulatory', link: '/laws' },
					{ id: 5, name: 'news', link: '/news' }
					// { id: 6, name: 'translationService', link: '/translation-service' }
					// { id: 6, name: 'travels', link: '/transport' }
					// { id: 7, name: 'orders', link: '/orders' }
					// { id: 8, name: 'communicate', link: '/contact-us' }
				]
			}
		},
		watch: {
			$route: function () {
				if (this.isBurger) {
					this.isBurger = false
					document.body.classList.remove('_lock')
				}
			}
		},
		methods: {
			goPage(path) {
				this.isService = false
				this.$router.push(this.localeLocation(path))
			},
			toggle() {
				this.isService = !this.isService
				window.addEventListener('click', (event) => {
					if (!this.$el.contains(event.target)) {
						this.isService = false
					}
				})
			},
			showBurgerMenu() {
				this.isBurger = !this.isBurger

				if (this.isBurger) {
					document.body.classList.add('_lock')
				} else {
					document.body.classList.remove('_lock')
				}
			},
			showContact() {
				this.isContactBefore = true
				setTimeout(() => {
					this.isContact = true
					document.body.classList.add('_lock')
				}, 0)
			},
			closeContact() {
				this.isContact = false
				document.body.classList.remove('_lock')
				setTimeout(() => {
					this.isContactBefore = false
				}, 400)
			},
			openLocale() {
				this.isActive = !this.isActive
				window.addEventListener('click', (event) => {
					if (!this.$el.contains(event.target)) {
						this.isActive = false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: sticky;
		top: 0px;
		z-index: 8;
		width: 100%;
		// .header__box
		&__box {
		}

		// .header__top

		&__top {
			width: 100%;
			background: #05659b;
			position: relative;
			z-index: 17;
			@media (max-width: 425px) {
				padding: 0px;
			}
		}

		// .header__top-container

		&__top-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			min-height: 40px;
		}

		// .header__logo

		&__logo {
			// width: 82.76px;
			// height: 64.66px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			padding-bottom: 5px;
			a {
				display: flex;
				align-items: center;
				gap: 10px;
				p {
					font-size: 16px;
					font-weight: 700;
					line-height: 19.2px;
					max-width: 400px;
					color: #111;
					@media (max-width: 768px) {
						font-size: 12px;
						line-height: 15.2px;
					}
					@media (max-width: 425px) {
						font-size: 8px;
					}
				}
			}

			img {
				width: 100%;
				height: 100%;
			}
			@media (max-width: 768px) {
				img {
					width: 200px;
				}
			}
			@media (max-width: 538px) {
				padding: 10px;
				&:deep(svg) {
					width: 40px;
				}
				img {
					width: 150px;
				}
			}
			@media (max-width: 425px) {
				&:deep(svg) {
					width: 30px;
				}
				img {
					width: 130px;
				}
			}
		}
		// .header__year-logo

		&__year-logo {
			display: flex;
			align-items: center;
			p {
				max-width: 300px;
				font-size: 16px;
				font-weight: 700;
				line-height: 20.26px;
				text-transform: uppercase;
			}
			img {
				width: 100%;
				height: 100%;
				max-width: 74px;
				max-height: 74px;
				object-fit: cover;
				object-position: center;
			}

			@media (max-width: 768px) {
				p {
					font-size: 8px;
					line-height: 10.26px;
					width: 170px;
				}
				img {
					max-width: 30px;
					max-height: 30px;
				}
			}
		}

		&__logo-box {
			display: flex;
			align-items: center;
			gap: 10px;
			img {
				width: 104px;
				height: 66px;
			}
			@media (max-width: 600px) {
				gap: 6px;
				img {
					width: 80px;
					height: 40px;
				}
			}
			@media (max-width: 400px) {
				gap: 5px;
				img {
					width: 30px;
					height: 30px;
				}
			}
		}

		&__title {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 20px;
			font-size: 16px;
			font-weight: 700;
			line-height: 19.2px;
			text-align: left;
			padding: 13.33px 0px;
			color: var(--black);
			@media (max-width: 768px) {
				width: 108px;
				font-size: 10px;
				line-height: 12px;
				padding: 12px 0px;
			}
			@media (max-width: 320px) {
				width: 100px;
			}
		}

		&__right {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 20px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 22px;
			padding: 13.33px 0px;
			@media (max-width: 992px) {
				gap: 14px;
			}
			@media (max-width: 425px) {
				width: max-content;
			}
		}
		&__contact {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			padding: 4.5px 10px;
			cursor: pointer;

			span {
				&:nth-child(2) {
					font-size: 14px;
					font-weight: 500;
					line-height: 16.8px;
					text-align: left;
					color: var(--text);
					@media (max-width: 992px) {
						display: none;
					}
				}
			}
		}

		&__langs {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			@media (max-width: 992px) {
				display: none;
			}
		}

		&__lang {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
			font-family: Inter;
			font-size: 10.88px;
			font-weight: 500;
			line-height: 13.05px;
			color: rgba(255, 255, 255, 1);
			border-radius: 4px;
			transition: all 0.3s ease;
			&.nuxt-link-exact-active,
			&.nuxt-link-active,
			&:hover {
				background: #0774b1;
				color: var(--white);
				transition: all 0.3s ease;
			}
		}
		// .header__bottom

		&__bottom {
			width: 100%;
			background: rgba(249, 249, 249, 1);
		}

		// .header__bottom-container

		&__bottom-container {
			position: relative;
			z-index: 10;
			display: flex;
			justify-content: space-between;
			button {
				background: #0774b1;

				border-radius: 4px;
				font-family: Inter;
				font-size: 11.4px;
				font-weight: 500;
				line-height: 13.68px;
				color: #ffff;
				@media (max-width: 992px) {
					display: none;
				}
			}
		}

		// .header__menu

		&__menu {
		}
	}

	.menu {
		&.active {
			.menu__body {
				right: 0px;
				transition: 0.3s;
			}
			.menu__lang {
				right: 0px;
				bottom: 0px;
				transition: 0.3s;
			}
		}
		// .menu__burger
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (max-width: 1200px) {
			gap: 10px;
		}
		@media (max-width: 1000px) {
			gap: 2px;
		}
		@media (max-width: 992px) {
			justify-content: flex-end;
		}

		// .menu__body

		&__body {
			flex: 1 1 auto;
			@media (max-width: 992px) {
				position: fixed;
				top: 64px;
				bottom: 0px;
				width: 100%;
				background: var(--white);
				z-index: 5;
				padding: 10px 20px;
				right: -100%;
				overflow: auto;
				transition: 0.3s;
			}
		}

		// .menu__list

		&__list {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			gap: 20px;
			@media (max-width: 992px) {
				flex-direction: column;
			}
		}

		// .menu__item

		&__item {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			@media (max-width: 992px) {
				width: 100%;
				&:hover {
					cursor: pointer;
					background-color: #f5fbf7;
					.menu__link {
						cursor: pointer;
						color: var(--button-back);
					}
				}
			}
		}
		// .menu__item-service

		&__item-service {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			padding: 10px 5px;
			transition: all 0.2s ease;
			@media (max-width: 992px) {
				width: 100%;
				flex-direction: column;
				align-items: flex-start;
			}
			&:hover {
				transition: all 0.2s ease;
				.menu__link_service {
					cursor: pointer;
					color: var(--green);
					transition: all 0.2s ease;
				}
				.menu__icon {
					color: var(--green);
					transition: all 0.2s ease;
				}
			}
			&.active {
				transition: all 0.2s ease;

				.menu__link_service {
					cursor: pointer;
					color: var(--green);
				}
				.menu__icon {
					transform: rotate(180deg);
					color: var(--green);
					transition: 0.3s;
				}
				.menu__sub-list {
					visibility: visible;
					opacity: 1;
					pointer-events: all;
					transition: 0.3s;
					@media (max-width: 992px) {
						height: 100%;
					}
				}
			}
			&._active {
				transition: all 0.2s ease;
				.menu__link_service {
					cursor: pointer;
					color: var(--green);
					transition: all 0.2s ease;
				}
				.menu__icon {
					color: var(--green);
					transition: all 0.2s ease;
				}
			}
		}

		&__item-service-box {
			display: flex;
			align-items: center;
			@media (max-width: 992px) {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				cursor: pointer;
				padding: 14px 16px;
				&:hover {
					background: #fcfcfc;
				}
			}
		}

		// .menu__link
		&__link {
			padding: 10px 5px;
			padding-left: 15px;
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			color: #111111;
			width: 100%;
			height: 100%;
			transition: all 0.2s ease;
			position: relative;
			&:hover,
			&.nuxt-link-exact-active,
			&.nuxt-link-active {
				color: #05659b;
				transition: all 0.2s ease;
				&::before {
					content: '';
					position: absolute;
					top: 17px;
					left: 3px;
					width: 5px;
					height: 5px;
					background: #05659b;
					border-radius: 50%;
				}
			}
			@media (max-width: 992px) {
				width: 100%;
				padding: 14px 16px;
			}
		}

		// .menu__link_service
		&__link_service {
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			color: var(--black);
			cursor: pointer;
			@media (max-width: 992px) {
				flex: 1 1 auto;
			}
		}

		// .menu__icon

		&__icon {
			margin-left: 10px;
			transition: 0.3s;
			width: 14px;
			height: 14px;
		}

		// .menu__sub-list

		&__sub-list {
			position: absolute;
			top: calc(100% + 8px);
			left: 0px;
			width: calc(100% + 1px);
			background: var(--white);
			box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			@media (max-width: 992px) {
				position: relative;
				width: 100%;
				display: block;
				box-shadow: none;
				height: 0;
				visibility: hidden;
				opacity: 0;
				pointer-events: none;
				transition: height 0.3s;
			}
		}

		// .menu__sub-item

		&__sub-item {
			&:first-child {
				> a {
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
				}
			}
			&:last-child {
				> a {
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
				}
			}
		}

		// .menu__sub-link

		&__sub-link {
			display: block;
			padding: 14px 20px;
			cursor: pointer;
			transition: all 0.3s ease;
			font-size: 14px;
			font-weight: 500;
			line-height: 16.8px;
			text-align: center;
			color: var(--black);
			&:hover {
				background: #fcfcfc;
				width: 100%;
				transition: all 0.3s ease;
			}
		}

		// .menu__lang

		&__lang {
			position: relative;
			@media (max-width: 992px) {
				position: fixed;
				z-index: 5;
				bottom: 20px;
				width: 100%;
				right: -100%;
				transition: 0.3s;
			}
			&.active {
				.menu__lang-dropdown {
					visibility: visible;
					opacity: 1;
					pointer-events: all;
					transition: 0.3s;
				}
				.menu__lang-btn {
					span {
						&:nth-child(2) {
							transform: rotate(-180deg);
							transition: 0.3s;
						}
					}
				}
			}
		}

		// .menu__lang-btn

		&__lang-btn {
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 10px 0px;
			cursor: pointer;
			@media (max-width: 992px) {
				display: none;
			}
			span {
				font-size: 16px;
				line-height: 24px;
				text-align: center;
				color: var(--text-link);
				transition: 0.3s;
				width: 14px;
				height: 14px;
			}
		}

		// .menu__lang-dropdown

		&__lang-dropdown {
			position: absolute;
			left: 0px;
			top: 100%;
			width: 100%;
			background: var(--white);
			box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			z-index: 7;
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			transition: 0.3s;
			padding: 10px 0px;

			a {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px;
				font-size: 14px;
				font-weight: 500;
				line-height: 16.8px;
				text-align: left;
				color: var(--text);
				border-radius: 4px;
				transition: all 0.3s ease;
				&.nuxt-link-exact-active,
				&.nuxt-link-active,
				&:hover {
					background: #0774b1;

					color: var(--white);
					transition: all 0.3s ease;
				}
			}
			@media (max-width: 992px) {
				visibility: visible;
				opacity: 1;
				pointer-events: all;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: none;
				border-radius: 0px;
			}
		}

		// .menu__lang-item

		&__lang-item {
			cursor: pointer;
			padding: 14px 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-transform: uppercase;
			@media (max-width: 992px) {
			}
		}
	}

	.menu__burger {
		display: none;
		color: #fcfcfc;
		@media (max-width: 992px) {
			display: block;
		}
		width: 24px;
		height: 24px;
		position: relative;
		z-index: 6;
		cursor: pointer;
		span {
			display: block;
			background: #fcfcfc;
			width: 18px;
			border-radius: 10px;
			height: 1.5px;
			&:nth-child(1) {
				position: absolute;
				top: 6px;
				left: 50%;
				transform: translateX(-50%);
				transition: 0.3s;
			}
			&:nth-child(2) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: 0.3s;
			}
			&:nth-child(3) {
				position: absolute;
				bottom: 6px;
				left: 50%;
				transform: translateX(-50%);
				transition: 0.3s;
			}
		}

		&.active {
			span {
				&:nth-child(1) {
					position: absolute;
					top: 12px;
					left: 50%;
					transform: translateX(-50%) rotate(-45deg);
					transition: 0.3s;
				}
				&:nth-child(2) {
					position: absolute;
					top: calc(50% + 1px);
					left: 50%;
					transform: translate(-50%, -50%) rotate(45deg);
					transition: 0.3s;
				}
				&:nth-child(3) {
					visibility: hidden;
					opacity: 0;
					transition: 0.3s;
				}
			}
		}
	}
</style>
