export default {
    template: `
  <!-- Chat Section -->
    <div class="row"  >
      
      <!-- Sidebar - Contacts List -->
      <div class="col-md-4 col-lg-3 border-end d-none d-md-flex flex-column">
        <h4 class="text-center py-3">Contacts</h4>
        <div class="list-group overflow-auto flex-grow-1">
          <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
            <img src="static/img//website/profile_other.png" width="40" height="40" class="rounded-circle me-3" alt="User">
            <div>
              <h6 class="mb-0">Chatting with other</h6>
              <small class="text-muted">Last message snippet...</small>
            </div>
          </a>
          <!-- Add more contacts here in the same format -->
        </div>
      </div>

      <!-- Chat View -->
      <div class="col-12 col-md-8 col-lg-9 h-100 overflow-auto"  ref="chatView" id="chatView">
        
      <div class="border-bottom p-3 d-flex align-items-center">
          <img src="static/img//website/profile_other.png" class="rounded-circle me-3" alt="Chatting with" width="40" height="40">
          <h5 class="mb-0">Chatting with other</h5>
        </div>

        <!-- Messages Area -->
        <div class="flex-grow-1 p-3" id="chatArea" v-for="message in messages" >

          <!-- Received Message -->
          <div class="d-flex align-items-start mb-3" v-if="message.senderId._id !== id">
            <img v-if="message.senderId.gender == 'male'" src="static/img//website/profile_male.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <img v-if="message.senderId.gender == 'female'" src="static/img//website/profile_female.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <img v-if="message.senderId.gender == 'other' || message.senderId.gender == undefined" src="static/img//website/profile_other.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <div class="p-3 bg-body-secondary rounded-3">
              <p class="mb-0"><strong>{{ message.senderId.username }}</strong>: {{ message.content }}</p>
              <small class="text-muted">{{ new Date(message.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</small>
            </div>
          </div>

          <!-- Sent Message -->
          <div class="d-flex align-items-end flex-row-reverse mb-3" v-if="message.senderId._id === id">
            <img v-if="message.senderId.gender == 'male'" src="static/img//website/profile_male.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <img v-if="message.senderId.gender == 'female'" src="static/img//website/profile_female.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <img v-if="message.senderId.gender == 'other' || message.senderId.gender == undefined" src="static/img//website/profile_other.png" class="rounded-circle me-3" alt="User Profile" width="40" height="40">
            <div class="p-3 bg-primary text-white rounded-3">
              <p class="mb-0"><strong>Me</strong>: {{ message.content }}</p>
              <small class="text-white-50">{{ new Date(message.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</small>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-top p-3" @submit="emitMessage">
          <form class="d-flex">
            <input type="text" class="form-control me-2" placeholder="Type a message" v-model="inputMessage">
            <button type="submit" class="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
    `,
    data() {
        return {
            inputMessage: '',
            messages: [],
            socket: null,
            id: jwt_decode(localStorage.getItem("token")).id,
        }
    },
    methods: {
        emitMessage(e) {
            e.preventDefault()
            if (this.inputMessage) {
                this.socket.emit('chat message', this.inputMessage, this.id)
                this.inputMessage = ''
            }
        }
    },
    mounted() {
        this.socket = io();

        console.log('Connected to server:', this.socket.connected);

        this.socket.on('connect', () => {
            console.log('Connected to server!');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server!');
        });

        this.socket.on('chat message', (msg) => {
            this.messages.push(msg);
        });
        this.socket.on('chat init', (msg) => {
          this.messages = msg;
      });
    },
    updated() {
      const chatView = this.$refs.chatView;
      if (chatView && chatView.scrollHeight > chatView.offsetHeight) {
        chatView.scrollTop = chatView.scrollHeight;
      }
    }

}

