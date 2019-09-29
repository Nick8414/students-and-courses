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
    <AppPagination :pageCount="pageCount" @changePage="changeCurrentPage" />
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

import { openDB, deleteDB } from "idb";
//import { async } from "q";

//    (() => {
//   'use strict'
//   if (!('indexedDB' in window)) {
//     console.warn('IndexedDB not supported')
//     return
//   }
// //...IndexedDB code
//   //Check

// })()

// if (!upgradeDb.objectStoreNames.contains('store3')) {
//   upgradeDb.createObjectStore('store3')
// }

const dbName = "StudentCoursesDB";
const storeName = "Students";
const version = 1; //versions start at 1

//   (async () => {
//   //...

//   const db = await openDB(dbName, version+1, {
//     upgrade(db, oldVersion, newVersion, transaction) {
//       const store = db.createObjectStore(storeName, {
//         keyPath: 'id',
//         autoIncrement: true
//       })

//     }
//   })
// })()

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

  // Add an article:
  // await db.add('articles', {
  //   title: 'Article 1',
  //   date: new Date('2019-01-01'),
  //   body: '…',
  // });
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
      currentPage: 0
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
      const start = this.currentPage * this.pageSize;
      const end = Number(start) + Number(this.pageSize);

      console.log("start", start);
      console.log("end", end);

      if (this.searchQuery === "") {
        return this.users
          .sort((a, b) => {
            //return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
            return b.name > a.name ? 1 : a.name > b.name ? -1 : 0;
          })
          .slice(start, end);
      } else {
        const filteredUsers = this.users.filter(row => {
          console.log(row);
          // return Object.keys(row).some(key=>{
          //   console.log(key)
          //   return String(row[key]).toLowerCase().indexOf(this.searchQuery) > -1
          // })
          return row.name.toLowerCase().indexOf(this.searchQuery) > -1;
        });
        // return String(el.name) === String(this.searchQuery )
        return filteredUsers;
      }
    },

    pageCount() {
      let l = this.users.length,
        s = this.pageSize;
      console.log(l);
      console.log(s);
      return Math.ceil(l / s);
    }
  },

  mounted() {
    (async () => {
      const db = await openDB(dbName, version);
      // const items = await db.transaction(storeName).objectStore(storeName).getAllKeys();
      const items = await db.getAllFromIndex(storeName, "id");
      console.log(items);
      this.users = [...items];
    })();
  },

  methods: {
    changePageSize(pageSize) {
      console.log("page size", pageSize);
      this.pageSize = pageSize;
    },
    changeCurrentPage(page) {
      console.log(page);
      this.currentPage = page;
    },
    clicked() {
      console.log("clicked");
    },
    editUser(user, index) {
      console.log("edit students");
      this.editIdx = this.users.findIndex(e => {
        return parseInt(e.id) === parseInt(user.id);
      });

      this.showModal = true;
      this.user = { ...user };
    },
    async saveUser(user) {
      if (this.editIdx > -1) {
        Object.assign(this.users[this.editIdx], user);
        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status
        };

        const db = await openDB(dbName, version, {
          upgrade(db) {
            db.createObjectStore(storeName);
          }
        });

        return (await db).put(storeName, newUser);
      } else {
        this.users.unshift(user);
      }
      this.showModal = false;

      const db = await openDB(dbName, version);

      // Add an article:
      await db.add(storeName, {
        name: user.name,
        email: user.email,
        status: user.status
      });
    },
    async deleteUser(user) {
      const index = this.users.findIndex(el => {
        return parseInt(el.id) === parseInt(user.id);
      });
      confirm("Вы хотите удалить запись?") && this.users.splice(index, 1);
      // const db = await openDB(dbName, version);
      // return (await db).delete(storeName, user.id);
      //api.delete
    }
  }
};
</script>
