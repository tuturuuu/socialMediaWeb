export default{
    template: `

     <!-- Main Content -->
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3">
        <sidebar-left-component :username="username" :bio="bio"></sidebar-left-component>
      </div>
      <div class="col-md-6">
        <feed-component></feed-component>
      </div>

      <div class="col-md-3">
        <sidebar-right-component></sidebar-right-component>
      </div>


    </div>
  </div>

  `,
  data(){
    return{
      username: "",
      bio: "",
    }
  },
  async mounted(){
    const token = localStorage.getItem('token')
    if(token == null){
      this.$router.push('/login')
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        }
      })
      const data = await response.json();
      this.username = data.username;
      this.bio = data.bio;
    } catch (error) {
      console.log(error)
    }

  }
}