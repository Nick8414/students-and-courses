<template>
  <div>
    <AppButton 
      theme="add" 
      size="large" 
      icon="edit" 
      @click.prevent="showModal = true"
      title="Add record"
    >
      <i class="material-icons vertical-align-middle">add</i>
    </AppButton>

    <strong>Users</strong>
    <AppModal
      v-if="showModal"
    />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td> {{ user.name }} </td>
          <td> {{ user.email }} </td>
          <td> {{ user.status }} </td>
          <td>
            <AppButton 
              theme="edit" 
              size="normal"  
              @click.prevent="clicked"
              title="Edit record"
            >
              <i class="material-icons vertical-align-middle">edit</i>
            </AppButton> 
            <AppButton 
              theme="delete" 
              size="normal" 
              @click.prevent="clicked"
              title="Delete record"
            >
              <i class="material-icons vertical-align-middle">delete</i>
            </AppButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
  import AppButton from "@/components/UIComponents/AppButton";
  import AppModal from "@/components/AppModal"


  export default {
    name: 'home',
    data() {
      return {
        showModal: false,
        users: [
          {
            id: 1,
            name: 'Gary Busey',
            email: 'busey@mail.com',
            status: 'Active'
          },
          {
            id: 2,
            name: 'Jeff Bridges',
            email: 'bridges@mail.com',
            status: 'Inactive'
          },
          {
            id: 3,
            name: 'Michael Cimino',
            email: 'Cimino@mail.com',
            status: 'Active'
          }
        ]
      }
    },

    components: {
      AppButton,
      AppModal
    },

    methods: {
      clicked () {
        console.log('clicked')
      }
    }
    
  }
</script>
