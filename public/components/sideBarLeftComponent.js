import trendingTopics from "./trendingTopics.js"
import miniProfile from "./miniProfile.js"
export default {
    template: `
<!-- Sidebar - Profile & Trends -->
        <!-- Profile Section -->
        <div class="card mb-3">
          <miniProfile></miniProfile>
        </div>

        <trendingTopics></trendingTopics>
      
    `,
    
   components: {
  trendingTopics,
  miniProfile  
},

}