<template>
	<div class="admin-slider">
		<div class="admin-slider__container">
			<div class="admin-slider__title-box">
				<div class="admin-slider__title">Gallareýa</div>
			</div>
			<div class="admin-slider__body">
				<div class="admin-slider__item">
					<div class="admin-slider__item-bottom">
						<div class="admin-slider__item-left">
							<span>Gallareýa</span>
							<upload-slider icon="addPhotoIconAdmin" text="Add Photo" @uploadImage="uploadPhoto" />
						</div>
						<div class="admin-slider__images">
							<div
								v-for="item in images"
								:key="item.uuid"
								class="admin-slider__img-box"
								style="flex-direction: row; margin-left: 30px"
							>
								<div class="admin-slider__img">
									<img :src="`${imgURL}/uploads/gallery/${item?.img_path}`" alt="" />
								</div>
								<div>
									<Button @onClick="removePhoto(item.uuid)" prependIcon="deleteAdmin" onlyIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseIcon from '@/components/BaseIcon.vue'
	import Button from '@/components/base/Button.vue'
	import UploadSlider from '@/components/base/UploadSlider.vue'

	import { ADD_GALLERY, GET_GALLERY, REMOVE_GALLERY } from '@/api/admin.api'
	import { mapGetters } from 'vuex'

	export default {
		layout: 'admin',
		components: { BaseIcon, Button, UploadSlider },
		computed: { ...mapGetters(['imgURL']) },
		middleware: ['auth-admin'],
		data() {
			return {
				loading: false,
				images: []
			}
		},
		async mounted() {
			await this.getGallery()
		},
		methods: {
			async getGallery() {
				try {
					const { data, status } = await GET_GALLERY()
					if (status) {
						if (data?.data) {
							this.images = data.data || []
						}
					}
				} catch (error) {
					console.error(error)
				}
			},

			async uploadPhoto(e) {
				const { data, status } = await ADD_GALLERY({
					data: { file: e.target.files[0] }
				})

				await this.getGallery()
			},

			async removePhoto(uuid) {
				try {
					const { status } = await REMOVE_GALLERY({ data: { uuid } })

					await this.getGallery()
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
			height: 90vh;
			overflow: auto;
		}

		// .admin-slider__item

		&__item {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			padding: 20px;
			height: 100%;
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
			flex-direction: column;
			gap: 20px;
			justify-content: flex-start;
			background-color: var(--white);
			border-radius: 4px;
			padding: 10px;
			height: 100%;
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
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
			width: 100%;
			height: 100%;
			overflow: auto;
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
			min-height: 200px;
			// width: 33.33%;
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
