<template>
	<popup>
		<div class="about-us__body">
			<div class="about-us__inputs">
				<input-partners :tm.sync="form.link" />
			</div>
			<uploader-image
				v-if="!service"
				@uploadImage="addImg"
				:img="file"
				:size="form.size"
				:text="formDate && !updateText ? 'Add document' : 'Add Photo'"
				:icon="formDate && !updateText ? 'importFile' : 'addPhotoIconAdmin'"
			/>
		</div>
		<div class="about-us__btns">
			<div class="about-us__btn">
				<Button text="Cancel" @onClick="$emit('close')" secondary padding />
			</div>
			<div class="about-us__btn">
				<Button v-if="form.uuid" text="Save" @onClick="saveItem" primary padding />
				<Button v-else text="Add" @onClick="addItem" primary padding />
			</div>
		</div>
	</popup>
</template>

<script>
	import AdminDate from '@/components/base/AdminDate.vue'
	import AdminText from '@/components/base/AdminText.vue'
	import Button from '@/components/base/Button.vue'
	import InputPartners from '@/components/base/InputPartners.vue'
	import UploaderImage from '@/components/base/UploaderImage.vue'
	import Popup from './Popup.vue'

	import { mapGetters } from 'vuex'

	export default {
		components: { Popup, InputPartners, UploaderImage, Button, AdminDate, AdminText },
		computed: { ...mapGetters(['imgURL']) },
		props: {
			form: { type: Object, default: () => {} },
			path: { type: String, default: () => '' },
			label: { type: String, default: () => '' },
			type: { type: String, default: () => '' },
			formDate: { type: Boolean, default: () => false },
			service: { type: Boolean, default: () => false },
			updateText: { type: Boolean, default: () => false }
		},
		data() {
			return { file: null }
		},
		mounted() {
			if (this.form.img_path && !this.form.size) this.file = `${this.imgURL}/uploads/${this.path}/${this.form.img_path}`
		},
		methods: {
			addImg(e) {
				this.file = URL.createObjectURL(e.target.files[0])
				this.form.img_path = e.target.files[0]
				this.form.size = e.target.files[0].size
			},
			saveItem() {
				this.$emit('save', this.form)
			},
			addItem() {
				this.$emit('add', this.form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about-us {
		&__body {
			display: flex;
			justify-content: space-between;
			gap: 20px;
			align-items: flex-start;
		}
		&__inputs {
			display: flex;
			flex-direction: column;
			flex: 1 1 auto;
			gap: 20px;
		}
		&__date {
			padding-top: 20px;
		}
		&__btns {
			padding-top: 40px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 20px;
		}
		&__btn {
			width: 108px;
		}
	}
</style>
