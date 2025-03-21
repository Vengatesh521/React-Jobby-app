import {Component} from 'react'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

class SavedJobs extends Component {
  state = {
    savedJobs: [],
  }

  componentDidMount() {
    this.loadSavedJobs()
  }

  loadSavedJobs = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || []
    this.setState({savedJobs})
  }

  renderSavedJobsList = () => {
    const {savedJobs} = this.state

    return savedJobs.length > 0 ? (
      <ul className="saved-jobs-list">
        {savedJobs.map(job => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div className="no-saved-jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no saved jobs"
        />
        <h1 className="no-jobs-heading">No Saved Jobs</h1>
        <p className="no-jobs-description">
          You haven’t saved any jobs yet. Bookmark jobs to view them here.
        </p>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="saved-jobs-container">
          <h1 className="saved-jobs-title">Saved Jobs</h1>
          {this.renderSavedJobsList()}
        </div>
      </>
    )
  }
}

export default SavedJobs
