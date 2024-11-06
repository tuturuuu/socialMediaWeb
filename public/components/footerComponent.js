export default {
    template: `
    
<footer class="bg-light text-center text-lg-start mt-5">
  <div class="container p-4">
    <div class="row">
      <div class="col-lg-6 col-md-12 mb-4">
        <h5 class="mb-3">About us</h5>
        <p>
          Welcome to MDB, your go-to platform for connecting with friends, sharing your moments, and discovering new passions. Our mission is to bring the world closer together by providing a space where you can express yourself and stay connected to the people and things you care about. Join us and be part of a vibrant community where every voice matters.
        </p>
      </div>
      <div class="col-lg-3 col-md-6 mb-4">
        <h5 class="mb-3">links</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1">
            <router-link to="/" class="text-dark">Posts</router-link>
          </li>
          <li class="mb-1">
            <router-link to="/profile" class="text-dark">Profile</router-link>
          </li>
          <li class="mb-1">
            <router-link to="/chatting" class="text-dark">Chat</router-link>
          </li>
          <li class="mb-1">
            <router-link to="/login" class="text-dark">Login</router-link>
          </li>
          <li class="mb-1">
            <router-link to="/register" class="text-dark">Register</router-link>
          </li>
        </ul>
      </div>
      <div class="col-lg-3 col-md-6 mb-4">
        <h5 class="mb-1">free hours</h5>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td>Mon - Fri:</td>
              <td>8am - 9pm</td>
            </tr>
            <tr>
              <td>Sat - Sun:</td>
              <td>8am - 1am</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</footer>
    `
}