import Posts from "./postComponent.js";
import filterButtonComponent from "./filterButtonComponent.js";

export default {
  template: `
     <!-- Feed Section -->
      
        <filterButtonComponent @updateSearch="search = $event" @updateSort="sortBy = $event" @createPost="createPost"></filterButtonComponent>

        <Posts ref="postRef" :sortBy="sortBy" :search="search"></Posts>
        `,
  data() {
    return {
      sortBy: "newest",
      search: ""
    };
  },
  components: {
    Posts,
    filterButtonComponent
  },
  methods: {
  async createPost(content) {
    
    await this.$refs.postRef.createPost(content);
  } ,


}
}
