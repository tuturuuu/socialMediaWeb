import sideBarLeftComponent from "../components/sideBarLeftComponent.js"
import sideBarRightComponent from "../components/sideBarRightComponent.js"
import feedComponent from "../components/feedComponent.js"

export default{
    template: `

     <!-- Main Content -->
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3 d-none md-none d-md-block">
        <sideBarLeftComponent :username="username" :bio="bio" :gender="gender"></sideBarLeftComponent>
      </div>

      <div class="col-md-6" >
        <feedComponent></feedComponent>
      </div>
      <div class="col-md-3">
        <sideBarRightComponent></sideBarRightComponent>
      </div>


    </div>
  </div>

  `,
  components:{
    sideBarLeftComponent,
    feedComponent,
    sideBarRightComponent,
  },
  data(){
    return{
      username: "",
      bio: "",
      gender: "",
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
      this.gender = data.gender;

    } catch (error) {
      console.log(error)
    }

  }
}