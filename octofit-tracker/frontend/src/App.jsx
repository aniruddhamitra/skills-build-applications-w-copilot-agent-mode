import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
              <h1 className="display-4 fw-bold mb-3">Train smarter with a connected fitness dashboard.</h1>
              <p className="lead text-muted mb-4">
                Track workouts, monitor team progress, and stay motivated with a modern multi-tier experience.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="#features">Explore features</a>
                <a className="btn btn-outline-secondary btn-lg" href="#api">View API</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 p-4">
                <h2 className="h4 fw-semibold mb-3">Today at a glance</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">9 active members</li>
                  <li className="list-group-item px-0">3 team challenges running</li>
                  <li className="list-group-item px-0">Leaderboard updated 2 min ago</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5">Activity logging</h3>
                <p className="text-muted mb-0">Capture workouts and measure consistency over time.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5">Team management</h3>
                <p className="text-muted mb-0">Create teams and coordinate progress across your network.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5">Smart insights</h3>
                <p className="text-muted mb-0">Receive recommendations that keep your routine fresh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="api" className="container pb-5">
        <div className="alert alert-info mb-0" role="status">
          Backend API health endpoint is available at <strong>/api/health</strong>.
        </div>
      </section>
    </main>
  )
}

export default App
