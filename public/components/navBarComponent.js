export default{
    template:`
<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-light navbar-light">
  <div class="container">
    <a class="navbar-brand ms-2" href="#">
      <img
        id="MDB-logo"
        src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
        alt="MDB Logo"
        draggable="false"
        height="30"
      />
    </a>

    <!-- Toggle button for mobile view -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item">
          <router-link class="nav-link mx-2" to="/profile">
            <i class="fas fa-plus-circle pe-2">Profile</i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link mx-2" to="/">
            <i class="fas fa-plus-circle pe-2">Post</i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link mx-2" to="/chatting">
            <i class="fas fa-comments pe-2">Chatting</i>
          </router-link>
        </li>
        <li class="nav-item" v-if="authenticated === true">
          <router-link class="nav-link mx-2" @click="logout" to="">
            <i class="fas fa-sign-out-alt pe-2">Sign out</i>
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link mx-2" to="/login">
            <i class="fas fa-sign-in-alt pe-2">Sign in</i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!-- Navbar -->

`,
  props: ['authenticated'],
  data() {
    return {
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$emit('authenticated', false)
      this.$router.push('/login')
    },
    
  }
}
