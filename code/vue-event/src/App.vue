<template>
  <div>App根组件</div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  async created () {
    const res = await registerAPI()
    console.log(res)
  }
}
</script>
<style>

</style>
