<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <column-list :list="list"></column-list>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleFormControlInput1"
               class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        type="text"
                        placeholder="请输入邮箱地址"
                        ref="inputRef"></validate-input>
        {{ emailVal }}
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1"
               class="form-label">密码</label>
        <validate-input type="password"
                        placeholder="请输入密码"
                        :rules="passRules"
                        v-model="passwordVal"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1"
               class="form-label">Example textarea</label>
        <textarea class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"></textarea>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<!-- <script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
interface TestProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
}
const user: TestProps = {
  isLogin: true
  // nickName: 'bhj'
}
</script> -->
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const user: UserProps = {
  isLogin: true,
  nickName: 'bhj'
}
const testData: ColumnProps[] = [
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  },
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  },
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  }
]

export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader, ValidateInput, ValidateForm },
  setup() {
    const inputRef = ref<any>()
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱地址' }
    ]
    const passRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
    const emailRef = reactive({
      val: 'qq',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      }
    }
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }
    return {
      list: testData,
      currentUser: user,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passRules,
      passwordVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style scoped>
</style>
