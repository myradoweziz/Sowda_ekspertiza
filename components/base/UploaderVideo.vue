<template>
  <label class="uploader">
    <input @change="uploadVideo" type="file" ref="file" class="uploader__input" />
    <video class="uploader__video" controls v-if="video">
      <source :src="`${imgURL}/uploads/orders/${video}`" />
    </video>
    <video class="uploader__video-control" id="videos" controls autoplay v-if="!video && blobFile"></video>
    <div class="uploader__show-area">
      <BaseIcon name="videoFile" />
      <span class="uploader__show-area-title"> Add video</span>
    </div>
  </label>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
import { mapGetters } from 'vuex'
export default {
  emits: ['changeFile'],
  components: { BaseIcon },
  computed: { ...mapGetters(['imgURL']) },
  props: { video: { type: String, default: () => null } },
  data() {
    return { blobFile: null, file: null }
  },
  methods: {
    uploadVideo(e) {
      this.$emit('changeFile', e.target.files[0])
      setTimeout(() => {
        this.blobFile = e.target.files[0]
      }, 500)
      setTimeout(() => {
        this.previewVideo()
      }, 1000)
    },
    previewVideo() {
      let videoTeg = document.querySelector('#videos')
      let reader = new FileReader()
      reader.readAsDataURL(this.blobFile)
      reader.addEventListener('load', function () {
        videoTeg.src = reader.result
      })
      setTimeout(() => {
        this.$refs.file = null
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 300px;
  height: 300px;
  cursor: pointer;
  position: relative;

  // .uploader__input
  &__input {
    display: none !important;
    input[type='file'] {
      display: none;
    }
    input {
      display: none;
    }
  }

  // .uploader__video

  &__video {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 2px;
    border: 1px dashed var(--text-3);
    video {
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }

  &__video-control {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 2px;
    border: 1px dashed var(--text-3);
    video {
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }

  // .uploader__show-area

  &__show-area {
    position: absolute;
    border-radius: 2px;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border-radius: 2px;
    background-color: var(--uploader-back);
  }
  &__show-area-title {
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--text-3);
    margin-top: 25px;
  }
}

.videos {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
