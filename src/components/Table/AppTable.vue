<template>
   <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody >
        <AppTableRow 
         v-for="user in users" :key="user.id"
          :user="user"
          @editUser="editUser"
          @deleteUser="deleteUser"
        />
      </tbody>
    </table>
</template>

<script>
import AppButton from "@/components/UIComponents/AppButton";
import AppTableRow from "@/components/Table/AppTableRow";
export default {
  props: {
    users: {
      required: false,
      type: Array
    }
  },
  components: {
    AppButton,
    AppTableRow
  },
  methods: {
    editUser(user) {
      console.log('edittable')
      this.$emit('editUser', user);
    },
    deleteUser(user) {
      console.log('delete')
      this.$emit('deleteUser', user);
    }
  }
}
</script>   