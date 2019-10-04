<template>
  <div>
    <AppButton
      theme="add"
      size="large"
      icon="edit"
      @click.prevent="showModal = true, editIdx = -1"
      title="Add record"
    >
      <i class="material-icons vertical-align-middle">add</i>
    </AppButton>

    <AppSearchInput v-model="searchQuery" />

    <AppSelect :pageSize="pageSize" @changePageSize="changePageSize" />

    <strong>Users</strong>
    <AppModal v-if="showModal" v-model="showModal" :user="user" @newRecord="saveUser" />
    <AppTable :users="filteredUsers" @editUser="editUser" @deleteUser="deleteUser" />
    <AppPagination :pageCount="pageCount" :currentPage="currentPage"  @changePage="changeCurrentPage" />
  </div>
</template>

<script>
(() => {
  "use strict";
  if (!("indexedDB" in window)) {
    console.warn("IndexedDB not supported");
    return;
  }
  //...IndexedDB code
  console.warn("IndexedDB  supported");
})();

// @ is an alias to /src
import AppButton from "@/components/UIComponents/AppButton";
import AppModal from "@/components/AppModal";
import AppTable from "@/components/Table/AppTable";
import AppPagination from "@/components/AppPagination";
import AppSelect from "@/components/UIComponents/AppSelect";
import AppSearchInput from "@/components/UIComponents/AppSearchInput";

import { openDB } from "idb";
import * as dbApi from '../api/api';

const dbName = "StudentCoursesDB";
const storeName = "Students";
const version = 1; //versions start at 1

async function demo() {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(storeName, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex("id", "id");
    }
  });
}
demo();

export default {
  name: "home",
  data() {
    return {
      showModal: false,
      editIdx: false,
      user: {
        name: "",
        email: "",
        status: ""
      },
      users: [],
      searchQuery: "",
      pageSize: 5,
      currentPage: 1
    };
  },

  components: {
    AppButton,
    AppModal,
    AppTable,
    AppPagination,
    AppSelect,
    AppSearchInput
  },

  computed: {
    filteredUsers() {
      const start = (this.currentPage-1) * this.pageSize;
      const end = Number(start) + Number(this.pageSize);

      if (this.searchQuery === "") {
        let sortKey = 0;
        return this.users
          .sort((a, b) => {
            if (sortKey === 1) {
              return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0;
            } else {
              return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)
            }
          })
          .slice(start, end);
      } else {
        const filteredUsers = this.users.filter(row => {
          return row.name.toLowerCase().indexOf(this.searchQuery) > -1;
        });
        return filteredUsers;
      }
    },

    pageCount() {
      let l = this.users.length,
          s = this.pageSize;
      return Math.ceil(l / s);
    }
  },

  mounted() {
    this.getStudents();
  },

  methods: {
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    },
  
    editUser(user) {
      this.editIdx = this.users.findIndex(e => {
        return parseInt(e.id) === parseInt(user.id);
      });

      this.showModal = true;
      this.user = { ...user };
    },

    async getStudents() {
      const items = await dbApi.getRecords(dbName, version, storeName);
      this.users = [...items];
    },
    saveUser(user) {
      if (this.editIdx > -1) {
        Object.assign(this.users[this.editIdx], user);
        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status
        };
        dbApi.updateRecord(dbName, version, storeName, newUser)

      } else {
        dbApi.createRecord(dbName, version, storeName, user)
        this.users.unshift(user);
      }
      this.showModal = false;
    },
    async deleteUser(user) {
      const index = this.users.findIndex(el => {
        return parseInt(el.id) === parseInt(user.id);
      });
      confirm("Вы хотите удалить запись?") && this.users.splice(index, 1);
      dbApi.deleteRecord(dbName, version, storeName, user.id);
    }
  }
};
</script>
