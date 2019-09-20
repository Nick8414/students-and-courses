<template>
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"><i class="material-icons vertical-align-middle">search</i></div>
    </div>
    <input type="text" :value="value" @change="changeInput" class="form-control" id="inlineFormInputGroup" placeholder="Search...">
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    changeInput(e) {
      this.value= e.target.value
    }
  }
  
}
</script>