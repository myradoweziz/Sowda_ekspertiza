<template>
	<div class="admin-slider">
		<div class="admin-slider__container">
			<div class="admin-slider__title-box">
				<div class="admin-slider__title">Baş sahypa</div>
				<div class="admin-slider__add-btn">
					<Button prependIcon="addPlusAdmin" text="Add Slider" primary @onClick="openPopup" />
				</div>
			</div>
			<div class="admin-slider__body">
				<div class="admin-slider__item">
					<div class="admin-slider__item-top">
						<div class="admin-slider__item-title1">Uly slider</div>
					</div>
					<div v-for="item in images" :key="item.uuid" class="admin-slider__item-bottom">
						<div class="admin-slider__images">
							<div class="admin-slider__img-box">
								<div class="admin-slider__img-langtitle">TM</div>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/slider/${item.image_tm}`" alt="" />
								</div>
							</div>
							<div class="admin-slider__img-box">
								<div class="admin-slider__img-langtitle">RU</div>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/slider/${item.image_ru}`" alt="" />
								</div>
							</div>
							<div class="admin-slider__img-box">
								<div class="admin-slider__img-langtitle">EN</div>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/slider/${item.image_en}`" alt="" />
								</div>
							</div>
						</div>
						<div class="admin-slider__icon-box">
							<!-- <div class="admin-slider__item-icon">
                <Button @onClick="editImage(item)" prependIcon="edit2Admin" onlyIcon />
              </div> -->
							<div class="admin-slider__item-icon">
								<Button @onClick="deleteImage(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
							</div>
						</div>
					</div>
					<div class="admin-slider__item-bottom">
						<div class="admin-slider__item-left">
							<span>Banner</span>
							<upload-slider icon="addPhotoIconAdmin" text="Add Photo" banner @uploadImage="uploadBanner" />
						</div>
						<div class="admin-slider__images" v-if="this.banners.length > 0">
							<div class="admin-slider__img-box" style="flex-direction: row; margin-left: 30px; width: 100%">
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/banner/${this.banners[0]?.image_tm}`" alt="" />
								</div>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/banner/${this.banners[0]?.image_ru}`" alt="" />
								</div>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/banner/${this.banners[0]?.image_en}`" alt="" />
								</div>
								<div>
									<Button @onClick="removeBanner()" prependIcon="deleteAdmin" onlyIcon />
								</div>
							</div>
						</div>
					</div>
					<div class="admin-slider__item-bottom">
						<div class="admin-slider__item-left">
							<span>Ýylyň nyşany</span>
							<upload-slider icon="addPhotoIconAdmin" text="Add Photo" @uploadImage="uploadPhoto" />
						</div>
						<div class="admin-slider__images" v-if="this.logo">
							<div class="admin-slider__img-box" style="flex-direction: row; margin-left: 30px">
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/logo/${this.logo?.image_path}`" alt="" />
								</div>
								<div>
									<Button @onClick="removeLogo" prependIcon="deleteAdmin" onlyIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<popup-slider
				v-if="activePopup"
				@close="closePopup"
				@add="addImage"
				@save="editPhoto"
				:item="selectedImage"
				:disabled="loading"
			/>
			<popup-banner
				v-if="activePopupBanner"
				@close="closePopupBanner"
				@add="addBanner"
				:item="selectedBanner"
				:disabled="loading"
			/>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import PopupBanner from '@/components/Popup/PopupBanner.vue'
	import PopupSlider from '@/components/Popup/PopupSlider.vue'
	import Button from '@/components/base/Button.vue'
	import UploadSlider from '@/components/base/UploadSlider.vue'

	import {
		addBanner,
		addLogo,
		addSlider,
		deleteBanner,
		deleteLogo,
		deleteSlider,
		getBanner,
		getLogo,
		getSlider
	} from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		components: { BaseIcon, PopupSlider, PopupBanner, Button, UploadSlider },
		computed: { ...mapGetters(['imgURL']) },
		middleware: ['auth-admin'],
		data() {
			return {
				activePopup: false,
				activePopupBanner: false,
				loading: false,
				images: [],
				logo: null,
				banners: [],
				selectedImage: { file_tm: '', file_ru: '', file_en: '', uuid: null },
				selectedBanner: { file_tm: '', file_ru: '', file_en: '', uuid: null }
			}
		},
		async mounted() {
			await this.getSliderImages()
			await this.getBanner()
			await this.getLogo()
		},
		methods: {
			openPopup() {
				this.activePopup = true
			},
			closePopup() {
				this.activePopup = false
				this.selectedImage = { photo_tm: '', photo_ru: '', photo_en: '', uuid: null }
			},
			closePopupBanner() {
				this.activePopupBanner = false
				this.selectedBanner = { photo_tm: '', photo_ru: '', photo_en: '', uuid: null }
			},
			uploadBanner() {
				if (this.banners && this.banners.length > 0) {
					alert('Ilki bilen onki bar bolan banneri pozyn !')
					return
				}

				this.activePopupBanner = true
			},
			editImage(item) {
				this.selectedImage = item
				this.openPopup()
			},
			async getSliderImages() {
				try {
					const { data, status } = await getSlider()
					if (status) {
						this.images = data.data
					}
				} catch (error) {
					console.error(error)
				}
			},
			async getLogo() {
				try {
					const { data, status } = await getLogo()
					if (status) {
						if (data?.data) {
							this.logo = data.data[data?.data?.length - 1 || 0] || null
						} else {
							this.logo = null
						}
					}
				} catch (error) {
					console.error(error)
				}
			},
			async getBanner() {
				try {
					const { data, status } = await getBanner()
					if (status) {
						if (data?.data) {
							this.banners = data.data || []
						} else {
							this.banners = []
						}
					}
				} catch (error) {
					console.error(error)
				}
			},
			async addImage(obj) {
				this.loading = true
				try {
					if (obj) {
						if (!obj.uuid) delete obj.uuid
						const { data, status } = await addSlider({
							data: { photo_tm: obj.file_tm, photo_en: obj.file_en, photo_ru: obj.file_ru }
						})
						if (status) await this.closePopup()
						await this.getSliderImages()
					}
				} catch (error) {
					console.error(error)
				} finally {
					this.loading = false
				}
			},
			async addBanner(obj) {
				this.loading = true
				try {
					if (obj) {
						if (!obj.uuid) delete obj.uuid
						const { data, status } = await addBanner({
							data: { photo_tm: obj.file_tm, photo_en: obj.file_en, photo_ru: obj.file_ru }
						})
						if (status) await this.closePopupBanner()
						await this.getBanner()
					}
				} catch (error) {
					console.error(error)
				} finally {
					this.loading = false
				}
			},
			async editPhoto(obj) {
				try {
					if (!obj.uuid) delete obj.uuid
					const { data, status } = await addSlider({
						data: { file_tm: obj.file_tm, file_en: obj.file_en, file_ru: obj.file_ru, uuid: obj.uuid }
					})
					if (status) await this.closePopup()
					await this.getSliderImages()
				} catch (error) {
					console.error(error)
				}
			},
			async uploadPhoto(e) {
				if (this.logo) {
					await this.removeLogo(this.logo?.uuid)
				}

				const { data, status } = await addLogo({
					data: { photo: e.target.files[0] }
				})
				await this.getLogo()
			},
			async deleteImage(id) {
				try {
					const { status } = await deleteSlider({ data: { uuid: id } })
					await this.getSliderImages()
				} catch (error) {
					console.error(error)
				}
			},
			async removeLogo(id) {
				try {
					const { status } = await deleteLogo({ data: { uuid: this.logo?.uuid } })

					if (id) return

					await this.getLogo()
				} catch (error) {
					console.error(error)
				}
			},
			async removeBanner() {
				try {
					const { status } = await deleteBanner({ data: { uuid: this.banners[0].uuid } })

					await this.getBanner()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.admin-slider {
		// .admin-slider__container

		&__container {
		}

		// .admin-slider__title-box

		&__title-box {
			height: 50px;
			padding: 5px 20px 5px 20px;
			border-radius: 2px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			background-color: #05659b;
		}

		// .admin-slider__title

		&__title {
			font-size: 18px;
			font-weight: 500;
			line-height: 21.09px;
			text-align: left;
			color: var(--white);
		}

		// .admin-slider__add-btn

		&__add-btn {
			display: flex;
			align-items: center;
		}

		// .admin-slider__body

		&__body {
			padding: 20px;
			display: flex;
			flex-direction: column;
		}

		// .admin-slider__item

		&__item {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			padding: 20px;
		}

		// .admin-slider__item-top

		&__item-top {
		}

		// .admin-slider__item-title1

		&__item-title1 {
			font-size: 20px;
			font-weight: 500;
			line-height: 23.59px;
			text-align: left;
		}

		// .admin-slider__item-title

		&__item-title {
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			letter-spacing: 0.05em;
			text-transform: capitalize;
			color: var(--text);
			padding-left: 20px;
			width: 200px;
		}

		// .admin-slider__item-text

		&__item-text {
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			letter-spacing: 0.05em;
			text-transform: capitalize;
			color: var(--text);
			padding-left: 20px;
		}

		// .admin-slider__item-bottom

		&__item-bottom {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: var(--white);
			border-radius: 4px;
			padding: 10px;
		}

		&__item-left {
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: 170px;
			height: 180px;
		}

		// .admin-slider__item-images

		&__images {
			display: flex;
			align-items: center;
			gap: 10px;
			width: 100%;
		}
		&__logo {
			display: flex;
			align-items: center;
			gap: 10px;
		}

		&__img-box {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 10px;
			width: 33.33%;
		}

		&__img-langtitle {
			margin-bottom: 4px;
			font-size: 16px;
			font-weight: 600;
		}

		// .admin-slider__img

		&__img {
			border-radius: 10px;
			width: 100%;
			height: 100%;
			> img {
				width: 100%;
				height: 100%;
				border-radius: 10px;
				object-fit: cover;
				object-position: center;
			}
		}

		// .admin-slider__img-title

		&__img-title {
			font-weight: 500;
			font-size: 16px;
			line-height: 120%;
			text-transform: uppercase;
			color: var(--text);
			padding-left: 20px;
			width: 200px;
			min-width: 200px;
		}

		&__img-text {
			font-weight: 500;
			font-size: 16px;
			line-height: 120%;
			text-transform: uppercase;
			padding-left: 20px;
			color: var(--text);
			word-break: break-all;
		}

		&__logo-box {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			width: 33.33%;
		}

		// .admin-slider__icon-box

		&__icon-box {
			display: flex;
			gap: 20px;
			padding-left: 20px;
		}

		// .admin-slider__edit-icon

		&__item-icon {
			cursor: pointer;
		}
	}
</style>
