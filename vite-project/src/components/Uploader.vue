<template>
  <div class="file-upload">
    <div class="file-upload-container"
         v-bind="$attrs"
         @click.prevent="triggerUpload">
      <slot v-if="fileStatus==='loading'"
            name="loading">
        <button class="btn btn-primary"
                disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus==='success'"
            :uploadedData="uploadedData"
            name="uploaded"><button class="btn btn-primary">上传成功</button></slot>
      <slot v-else
            name="default"><button class="btn btn-primary">点击上传</button></slot>
    </div>
    <input type="file"
           class="file-input d-none"
           ref="fileInput"
           @change="handleFileChange">
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

export default defineComponent({
  props: {
    action: {
      type: String, // 发送post请求地址
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref()
    watch(
      () => props.uploaded,
      newValue => {
        if (newValue) {
          fileStatus.value = 'success'
          uploadedData.value = newValue
        }
      }
    )
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files) //currentTarget.files 转换成 array
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            fileStatus.value = 'success'
            uploadedData.value = res.data
            context.emit('file-uploaded', res.data)
          })
          .catch(e => {
            fileStatus.value = 'error'
            context.emit('file-uploaded-error', { e })
          })
          .finally(() => {
            if (fileInput.value) {
              // fileInput.value 是dom结点
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData
    }
  }
})
</script>
