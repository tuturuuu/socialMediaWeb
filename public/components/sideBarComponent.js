export default {
    template: `
<!-- Sidebar - Profile & Trends -->
        <!-- Profile Section -->
        <div class="card mb-3">
          <div class="card-body text-center">
            <img src="https://via.placeholder.com/100" class="rounded-circle mb-3" alt="User Profile">
            <h5 class="card-title">{{username}} </h5>

            <p v-if="bio == null" class="card-text">Bio goes here...</p>
            <p v-if="bio !== null" class="card-text">{{bio}}</p>

            <router-link to="/profile" class="btn btn-primary">Edit Profile</router-link>
          </div>
        </div>

        <!-- Trending Topics -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Trending Topics</h5>
            <ul class="list-unstyled">
              <li><a href="#">#Topic1</a></li>
              <li><a href="#">#Topic2</a></li>
              <li><a href="#">#Topic3</a></li>
              <li><a href="#">#Topic4</a></li>
            </ul>
          </div>
        </div>
      
    `,

    props: ['username', 'bio']
}