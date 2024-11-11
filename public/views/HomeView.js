import sideBarLeftComponent from "../components/sideBarLeftComponent.js"
import sideBarRightComponent from "../components/sideBarRightComponent.js"
import feedComponent from "../components/feedComponent.js"

export default{
    template: `

     <!-- Main Content -->
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3 d-none md-none d-md-block">
        <sideBarLeftComponent></sideBarLeftComponent>
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

}