<template>
  <a-table
    size="small"
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <a v-if="column.dataIndex === 'name'">
        {{ text.first}} {{ text.last}}
      </a>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { computed, reactive } from 'vue'
import { usePagination } from 'vue-request'

const columns = reactive([
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]) 

const queryData = (params) => {
  console.log(params)
  return axios.get('https://randomuser.me/api?noinfo', { params })
}

const res = axios.get('http://qdht.youpinyun.net/api/index/index')
console.log('res==>', res)

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results'
  }
})

console.log(usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results'
  }
}))

const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value
}))

const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters
  })
}
</script>
<style lang='scss' scoped>
</style>