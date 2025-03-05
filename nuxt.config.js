import en from './locales/en'
import ru from './locales/ru'
import tm from './locales/tm'
export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head() {
		const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
		return {
			title: 'Türkmenistanyň Söwda-senagat edarasynyň “Söwda öýi”',
			htmlAttrs: {
				lang: 'en',
				myAttribute: ' Türkmenistanyň Söwda-senagat edarasynyň “Söwda öýi”',
				...i18nHead.htmlAttrs
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: '' },
				{ name: 'format-detection', content: 'telephone=no' },
				...i18nHead.meta
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }, ...i18nHead.link]
		}
	},
	server: {
		port: 3000,
		host: '0.0.0.0'
	},
	loading: {
		color: '#059B36',
		height: '2px'
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/assets/scss/style.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '@/plugins/vue-awesome-swiper', mode: 'client' },
		{ src: '@/plugins/particles', mode: 'client' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/i18n',
		'@leandromatos/nuxt-cookie',
		[
			'@nuxtjs/yandex-metrika',
			{
				id: '95743089',
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true
			}
		]
	],
	i18n: {
		locales: [
			{
				code: 'tm',
				lang: 'TM',
				name: 'TM',
				iso: 'tm-TM',
				file: 'tm',
				isCatchallLocale: true
			},
			{ code: 'ru', lang: 'RU', name: 'RU', iso: 'ru-RU', file: 'ru' },
			{ code: 'en', lang: 'EN', name: 'EN', iso: 'en-EN', file: 'en' }
		],
		detectBrowserLanguage: false,
		strategy: 'prefix_except_default',
		defaultLocale: 'tm',
		seo: true,
		vueI18n: {
			fallbackLocale: 'tm',
			messages: { tm, ru, en }
		}
	},
	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseUrl: process.env.BASE_URL
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
}
