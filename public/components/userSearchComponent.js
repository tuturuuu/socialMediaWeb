export default {
    template: `
        <div>
            <ul class="list-group">
                
                <li class="list-group-item" v-for="user in users" :key="user.id">
                    <img  src="static/img//website/profile_male.png" class="rounded-circle me-3" alt="User Profile" width="50" height="50">
                    
                    {{ user.name }}
                </li>
            </ul>
        </div>
    `,
    props: ['search'],
    data() {
        return {
            users: [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' },
                // Add more users as needed
            ]
        };
    },

}
