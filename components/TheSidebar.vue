<template>
	<div class="sidebar">
		<div class="sidebar__container">
			<div class="sidebar__logo">
				<div class="sidebar__icon">
					<base-icon name="logo" />
				</div>
			</div>
			<div class="sidebar__menu">
				<ul class="sidebar__list">
					<li v-for="menuItem in menu" :key="menuItem.id" class="sidebar__item">
						<nuxt-link exact :to="menuItem.path" :class="['sidebar__link']">
							<span>
								{{ menuItem.name }}
							</span>
						</nuxt-link>
					</li>
				</ul>
			</div>
			<div @click="logout" class="sidebar__log">
				<div class="sidebar__log-name">
					<div class="sidebar__log-last">Logout</div>
				</div>
				<div class="sidebar__log-icon">
					<base-icon name="logoutAdmin" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'

	export default {
		components: { BaseIcon },
		data() {
			return {
				isActive: false,
				isSub: false,
				isActiveId: 0,
				menu: [
					{ id: 1, name: 'Baş sahypa', path: '/marketing' },
					{ id: 10, name: 'Esasy habar', path: '/marketing/main-news' },
					{ id: 2, name: 'BIZ BARADA', path: '/marketing/about-us' },
					{ id: 3, name: 'Hyzmatlarymyz', path: '/marketing/our-services' },
					{ id: 5, name: 'HABARLAR', path: '/marketing/news' },
					{ id: 6, name: 'Galareýa', path: '/marketing/gallery' },
					{ id: 7, name: 'Hyzmatdaslarymyz', path: '/marketing/partners' }
				]
			}
		},
		mounted() {
			window.addEventListener('click', (event) => {
				if (!this.$el.contains(event.target)) {
					this.isActive = false
				}
			})
		},
		methods: {
			openSubItem() {
				this.isActiveId++
				this.isActiveId % 2 === 0 ? (this.isActive = false) : (this.isActive = true)
			},
			logout() {
				this.$router.push(`/marketing/login`)
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		// .sidebar__container
		width: 260px;
		height: 100vh;

		&__container {
			width: 100%;
			height: 100%;
			padding: 30px 20px 40px 20px;
			display: flex;
			flex-direction: column;
			background-color: var(--white);
		}

		// .sidebar__logo

		&__logo {
			display: flex;
		}

		// .sidebar__icon

		&__icon {
			width: 240px;
			height: 50px;
		}

		// .sidebar__menu

		&__menu {
			margin-top: 60px;
			width: 100%;
			height: 100%;
		}

		// .sidebar__list

		&__list {
			width: 100%;
		}

		// .sidebar__item

		&__item {
			&:not(:last-child) {
				margin-bottom: 10px;
			}
			.baseicons {
				transition: all 0.3s ease;
			}
			&.active {
				.sidebar__link {
					.baseicons {
						transform: rotate(-180deg);
						transition: 0.3s;
					}
				}
				.sidebar__sub-list {
					visibility: visible;
					opacity: 1;
					pointer-events: all;
					transition: 0.3s;
				}
			}
		}

		// .sidebar__link

		&__link {
			width: 221px;
			height: 48px;
			cursor: pointer;
			font-weight: 700;
			font-size: 14px;
			line-height: 21px;
			text-transform: uppercase;
			color: var(--text);
			transition: 0.3s;
			padding: 5px 10px 5px 10px;
			border-radius: 2px;
			display: flex;
			align-items: center;
			width: 100%;
			border-bottom: 0.5px solid rgba(0, 0, 0, 0.13);
			transition: all 0.3s ease;
			&:hover,
			&.active {
				color: var(--white);

				background-color: #05659b;
				transition: all 0.3s ease;
				border-bottom: 0.5px solid #05659b;
			}
			span {
				flex: 1 1;
			}
		}
		// .sidebar__sub-list
		&__sub-list {
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			transition: 0.3s;
		}

		// .sidebar__sub-item

		&__sub-item {
			display: flex;
			flex-direction: column;
			padding: 4px;
			a {
				background: #f9f9f9;
				border-radius: 4px;
				padding: 10px 20px;
				font-weight: 700;
				cursor: pointer;
				font-size: 14px;
				line-height: 21px;
				text-transform: uppercase;
				color: #333333;
				&:hover,
				&.active {
					background-color: rgba(8, 157, 53, 0.1);
					color: #089d35;
				}
			}
		}

		// .sidebar__sub-link

		&__sub-link {
			background: #f9f9f9;
			border-radius: 4px;
			margin-top: 2px;
		}
		// .sidebar__log

		&__log {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
		}

		// .sidebar__log-name

		&__log-name {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;
		}

		// .sidebar__log-first

		&__log-first {
			padding-bottom: 5px;
			font-weight: 400;
			font-size: 14px;
			line-height: 17px;
			text-transform: capitalize;
			color: var(--text-2);
		}

		// .sidebar__log-last

		&__log-last {
			font-weight: 700;
			font-size: 14px;
			line-height: 21px;
			text-transform: capitalize;
			color: var(--text-2);
		}

		// .sidebar__log-icon

		&__log-icon {
			cursor: pointer;
			width: 24px;
			height: 24px;
		}

		.nuxt-link-active,
		.nuxt-link-exact-active {
			color: var(--white);
			background-color: #05659b;
			transition: 0.3s;
		}
	}
</style>
