import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
      alt="home background"
      className="home-img"
    />
    <div className="home-content">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs that fit their life.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
