import trendingTopics from "./trendingTopics.js"
import miniProfile from "./miniProfile.js"
export default {
    template: `
<!-- Sidebar - Profile & Trends -->
        <!-- Profile Section -->
        <div class="card mb-3">
          <miniProfile :username="username" :bio="bio" :gender="gender"></miniProfile>
        </div>

        <trendingTopics></trendingTopics>
      
    `,
    
    props: ['username', 'bio', 'gender'],
   components: {
  trendingTopics,
  miniProfile  
}
}