export default {
    template: `
<!-- Sidebar - Profile & Trends -->
        <!-- Profile Section -->
        <div class="card mb-3">
          <div class="card-body text-center">
            <img v-if="gender == 'male'" src="static/img//website/profile_male.png" class="rounded-circle mb-3" alt="User Profile" width="100" height="100">
            <img v-if="gender == 'female'" src="static/img//website/profile_female.png" class="rounded-circle mb-3" alt="User Profile"  width="100" height="100">
            <img v-if="gender == 'other' || gender == undefined" src="static/img//website/profile_other.png" class="rounded-circle mb-3" alt="User Profile"  width="100" height="100">
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

    props: ['username', 'bio', 'gender']
}