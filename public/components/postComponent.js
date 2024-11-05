export default {
  template: `        
    <div>
      <!-- Post -->
      <div class="card post-card" v-for="post in filteredPosts.slice().reverse()" :key="post._id">
        <div class="card-body">
          <div class="d-flex">
            <img src="https://via.placeholder.com/50" class="rounded-circle me-3" alt="User Avatar">
            <div>
              <h6 class="card-title mb-0">{{ post.userId.username }}</h6>
              <small class="text-muted">{{ new Date(post.createdAt).toLocaleString() }}</small>
            </div>
            <div class="ms-auto" v-if="post.userId._id === id">
              <button class="btn btn-outline-primary btn-sm" @click="post.editing = true">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-outline-primary btn-sm m-1" @click="deletePost(post)">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
          <div v-if="post.editing" class="mt-3 mb-2">
            <input v-model="post.content" @blur="updatePost(post)" @keydown.enter="updatePost(post)" type="text" class="form-control">
          </div>
          <p v-if="!post.editing" class="mt-3">{{ post.content }}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-primary btn-sm"><i class="bi bi-cup-hot"></i></button>
            <button class="btn btn-outline-primary btn-sm">Comment</button>
            <button class="btn btn-outline-primary btn-sm"><i class="bi bi-share"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      errors: {
        content: "",
      },
      postsByMe: false,
      id: jwt_decode(localStorage.getItem("token")).id,
      debouncedSearch: "",      // Holds the debounced search term
      debounceTimeout: null     // Timeout ID for debouncing
    };
  },
  props: ["posts", "sortBy", "search"],
  emits: ["update", "delete"],
  methods: {
    updatePost(post) {
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
      this.$emit("update", post);
    },
    deletePost(post) {
      this.$emit("delete", post);
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout); // Clear existing timeout

      // Set new timeout to update `debouncedSearch` after delay
      this.debounceTimeout = setTimeout(() => {
        this.debouncedSearch = this.search; // Update with the debounced search term
      }, 300); // Delay in milliseconds
    }
  },
  computed: {
    filteredPosts() {
      let temp = [];
      switch (this.sortBy) {
        case "newest":
          this.posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          temp = this.posts;
          break;
        case "oldest":
          this.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          temp = this.posts;
          break;
        case "byMe":
          temp = this.posts.filter((post) => post.userId._id === this.id);
          break;
        default:
          break;
      }

      // Use the debounced search term for filtering
      if (this.debouncedSearch) {
        temp = temp.filter((post) => post.content.toLowerCase().includes(this.debouncedSearch.toLowerCase()));
      }

      return temp;
    }
  },
  watch: {
    search() {
      this.debounceSearch(); // Trigger debounce function when `search` changes
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimeout); // Clean up timeout when component is destroyed
  },
};
