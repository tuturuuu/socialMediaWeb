export default{
    template:`
  <!-- Chat Section -->
  <div class="container-fluid">
    <div class="row vh-100">
      
      <!-- Sidebar - Contacts List -->
      <div class="col-md-4 col-lg-3 border-end bg-light d-flex flex-column">
        <h4 class="text-center py-3">Contacts</h4>
        <div class="list-group overflow-auto flex-grow-1">
          <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
            <img src="https://via.placeholder.com/40" class="rounded-circle me-3" alt="User">
            <div>
              <h6 class="mb-0">User 1</h6>
              <small class="text-muted">Last message snippet...</small>
            </div>
          </a>
          <!-- Add more contacts here in the same format -->
        </div>
      </div>

      <!-- Chat View -->
      <div class="col-md-8 col-lg-9 d-flex flex-column">
        <div class="border-bottom p-3 d-flex align-items-center">
          <img src="https://via.placeholder.com/50" class="rounded-circle me-3" alt="Chatting with">
          <h5 class="mb-0">User 1</h5>
        </div>

        <!-- Messages Area -->
        <div class="flex-grow-1 overflow-auto p-3" id="chatArea">
          <!-- Received Message -->
          <div class="d-flex align-items-start mb-3">
            <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="User">
            <div class="p-3 bg-light rounded-3">
              <p class="mb-0">Hello! How are you?</p>
              <small class="text-muted">10:30 AM</small>
            </div>
          </div>

          <!-- Sent Message -->

          <div class="d-flex align-items-end flex-row-reverse mb-3" v-for="message in messages">
            <img src="https://via.placeholder.com/40" class="rounded-circle ms-2" alt="Me">
            <div class="p-3 bg-primary text-white rounded-3">
              <p class="mb-0">{{message}}</p>
              <small class="text-white-50">10:32 AM</small>
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
  </div>
    `,
    data(){
        return{
            inputMessage: '',
            messages: [],
            socket: null
        }
    },
    methods:{
        emitMessage(e){
            e.preventDefault()
            if(this.inputMessage){
                this.socket.emit('chat message', this.inputMessage)
                this.inputMessage = ''
            }
        }
    },
    mounted(){
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
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}