import Posts from "./postComponent.js";

export default {
  template: `
     <!-- Feed Section -->
      
     <div class="card mb-3">
          <div class="card-body">
            <form class="d-flex" >
              <select class="form-select me-2"  v-model="sortBy">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="byMe">By me</option>
              </select>
              <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" >

            </form>
          </div>
        </div>

        <!-- Create Post -->
        <div class="card mb-3">
          <div class="card-body">
            <form @submit.prevent="createPost">
              <textarea class="form-control" rows="3" placeholder="What's on your mind?" v-model="content"></textarea>
              <button class="btn btn-primary mt-3"><i class="bi bi-send-fill"></i></button>
            </form>
          </div>
        </div>

        <Posts :posts="posts" @update="updatePost" @delete="deletePost" :sortBy="sortBy" :search="search"></Posts>
        `,
  data() {
    return {
      sortBy: "newest",
      content: "",
      search: "",
      errors: {
        content: "",
      },
      posts: [],
    };
  },
  components: {
    Posts,
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.content) {
        this.errors.content = "Content is required";
      }
      if (this.content.length > 2000) {
        this.errors.content = "Content must be less than 2000 characters";
      }
    },
    async createPost() {
      this.validate();
      if (Object.keys(this.errors).length > 0) {
        alert(this.errors.content);
        return;
      }
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            content: this.content,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          this.posts.push(data.post);
          console.log(this.posts);
          this.content = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost(post) {
      post.editing = false;
      this.errors = {};

      if (!post.content) {
        this.errors.content = "Content is required";
      }
      if (post.content.length > 2000) {
        this.errors.content = "Content must be less than 2000 characters";
      }

      if (Object.keys(this.errors).length > 0) {
        alert(this.errors.content);
        return;
      }
      try {
        const response = await fetch("/api/post", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            content: post.content,
            post_id: post._id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          this.content = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deletePost(post) {
      try {
        const response = await fetch("/api/post", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            post_id: post._id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          const index = this.posts.findIndex((p) => p._id === post._id);
          if (index !== -1) {
            this.posts.splice(index, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    try {
      const response = await fetch("/api/post/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      this.posts = data;
    } catch (error) {
      console.log(error);
    }
  },
};
