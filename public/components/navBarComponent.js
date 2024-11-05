export default{
    template:`
<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-light navbar-light ">
  <div class="container">
    <a class="navbar-brand" href="#"
      ><img
        id="MDB-logo"
        src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
        alt="MDB Logo"
        draggable="false"
        height="30"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item">
          <router-link class="nav-link mx-2" to="/"><i class="fas fa-plus-circle pe-2"></i>Post</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link mx-2" to="/chatting"><i class="fas fa-plus-circle pe-2"></i>Chatting</router-link>
        </li>
        <li class="nav-item" v-if="authenticated === true">
          <router-link class="nav-link mx-2" @click="logout"  to=""><i class="fas fa-bell pe-2"></i>Sign out</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link mx-2" to="/login"><i class="fas fa-bell pe-2"></i>Sign in</router-link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
<!-- Navbar -->
`,
  props: ['authenticated'],
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$emit('authenticated', false)
      this.$router.push('/login')
    }
    
  }
}