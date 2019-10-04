<template  >
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled" @click="previousPage">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pageCount" @click="changePage(page)" :key="page"><a class="page-link" href="#">{{page}}</a></li>
   
    <li class="page-item" @click="nextPage">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>
<script>
export default {
  props: {
    pageCount: {
      required: true,
      type: Number,
      default: 1
    },
    currentPage: {
      required: true,
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
    nextPage() {
      this.$emit('changePage', this.currentPage + 1);
    },
    previousPage() {
      this.$emit('changePage', this.currentPage - 1);
    }
  }
  
}
</script>