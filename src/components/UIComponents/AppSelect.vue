<template>
  <div>
    <select :value="pageSize" @change="changePageSize" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
      <option  selected v-for="num in [1,2,3,4,5]" :key="num" >{{num}}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['pageSize'],
  methods: {
    changePageSize(e) {
      this.$emit('changePageSize', e.target.value)
    }
  }
}
</script>
 