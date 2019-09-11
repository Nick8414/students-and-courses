<template>
 <tr>
          <td> {{ user.name }} </td>
          <td> {{ user.email }} </td>
          <td> {{ user.status }} </td>
          <td>
            <AppButton 
              theme="edit" 
              size="normal"  
              @click.prevent="editUser(user)"
              title="Edit record"
            >
              <i class="material-icons vertical-align-middle">edit</i>
            </AppButton> 
            <AppButton 
              theme="delete" 
              size="normal" 
              @click.prevent="deleteUser(user)"
              title="Delete record"
            >
              <i class="material-icons vertical-align-middle">delete</i>
            </AppButton>
          </td>
        </tr>
</template>

<script>
import AppButton from "@/components/UIComponents/AppButton";
export default {
  props: {
    user: {
      required: false,
      type: Object
    }
  },
  components: {
    AppButton
  },
  methods: {
    editUser(user) {
      console.log('editrow')
      this.$emit('editUser', user);
    },
    deleteUser(user) {
      console.log('delete')
      console.log(user)
      this.$emit('deleteUser', user);
    }
  }
}
</script>