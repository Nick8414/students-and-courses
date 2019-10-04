<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col"><span class="arrow">Name</span></th>
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
<style scope>
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>