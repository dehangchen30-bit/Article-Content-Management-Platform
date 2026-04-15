<!-- 文章分类选择组件 -->
<script setup>
import { ref, onMounted } from 'vue'
import { getCateList } from '@/api/article'
// 文章分类数据
const cateList = ref([])
onMounted(async () => {
  const res = await getCateList()
  cateList.value = res.data.data
})

// 接收父组件传值
defineProps({
  cateId: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:cateId'])
</script>

<template>
  <el-select :modelValue="cateId" @update:modelValue="emit('update:cateId', $event)" clearable :style="width">
    <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id" />
  </el-select>
</template>

<style lang='less' scoped></style>