export default {
    template: `
    <!-- Suggestions Sidebar -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Suggestions</h5>
            <ul class="list-unstyled">
              <li class="d-flex align-items-center mb-2">
                <img src="https://via.placeholder.com/40" class="rounded-circle me-3" alt="User">
                <div>
                  <h6 class="mb-0">Suggested User</h6>
                  <small class="text-muted">@username</small>
                </div>
                <button class="btn btn-primary btn-sm ms-auto">Follow</button>
              </li>
              <!-- More suggestions here -->
            </ul>
          </div>
        </div>
    `
}