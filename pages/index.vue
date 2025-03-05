<template>
	<div style="width: 100%; height: 100%">
		<top-slider-banner />
		<about />
		<the-banner />
		<the-gallery />
		<the-partners />
		<the-map />
	</div>
</template>

<script>
	import TopSliderBanner from '@/components/TopSliderBanner.vue'
	import About from '@/components/ui/About.vue'
	import TheBanner from '@/components/ui/TheBanner.vue'
	import TheGallery from '@/components/ui/TheGallery.vue'
	import TheMap from '@/components/ui/TheMap.vue'
	import ThePartners from '@/components/ui/ThePartners.vue'

	export default {
		components: {
			About,
			TheBanner,
			TopSliderBanner,
			TheGallery,
			ThePartners,
			TheMap
		}
	}
</script>

<style lang="scss"></style>
