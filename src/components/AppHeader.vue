<template>
  <div id="nav">
     <nav class="navbar navbar-dark bg-dark">
     <a class="navbar-brand" href="#">Test app</a>
        <div class="container">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item-active">
              <router-link to="/">Users</router-link> 
              <router-link to="/courses">Courses</router-link>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</template>