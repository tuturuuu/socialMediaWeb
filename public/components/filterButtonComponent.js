export default {
    template: `     <div class="card mb-3">
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
        </div>`,
        data() {
            return {
              sortBy: "newest",
              content: "",
              search: "",
              errors: {
                content: "",
              },
            };
          },
          emits: ['createPost', 'updateSearch', 'updateSort'],
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
            this.$emit('createPost', this.content)
            this.content=""
          } ,

        },
        watch: {
        sortBy(newVal) {
            this.$emit('updateSort', newVal);
        },
        search(newVal) {
            this.$emit('updateSearch', newVal);
        }
        }
}