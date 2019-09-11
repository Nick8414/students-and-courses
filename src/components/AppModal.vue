<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add user</h5>
                  <button @click="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input v-model="user.name" type="text" class="form-control" id="inputEmail3" placeholder="Name">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input v-model="user.email" type="email" class="form-control" id="inputEmail3" placeholder="Email">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inlineFormCustomSelectPref" class="col-sm-2 col-form-label">Status</label>
                    <div class="col-sm-10">
                      <select v-model="user.status" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" >
                        <option selected>Choose...</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button @click="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="addUser" type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'showModal',
    event: 'close'
  },
  props: {
    showModal: {
      require: true,
      type: Boolean,
      default: false
    },
    user: {
      required: true,
      type: Object,
      default: {
        name  : '',
        email : '',
        status: ''
      }    
    }
  },
  data() {
    return {
      
    } 
  },
  methods: {
    close() {
      this.$emit('close', !this.showModal)
    },
    addUser() {
      let newUser = {...this.user}
      this.$emit('newRecord', newUser);
      this.user.name   = '';
      this.user.email  = '';
      this.user.status = '';
     // this.$emit('close', !this.showModal);
    },
    
  }
}
</script>

<style >
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
</style>