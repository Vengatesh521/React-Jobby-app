import {Link} from 'react-router-dom'
import './index.css'

const JobsList = ({jobs, apiStatus}) => {
  if (apiStatus === 'FAILURE') {
    return (
      <div className="failure-view">
        <img
          src="failure-image-url"
          alt="failure view"
          className="failure-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="retry-button"
          onClick={() => window.location.reload()} // Retry logic
        >
          Retry
        </button>
      </div>
    )
  }

  if (apiStatus === 'NO_DATA') {
    return (
      <div className="no-jobs-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="No jobs"
          className="no-jobs-image"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  if (apiStatus === 'SUCCESS') {
    return (
      <div className="jobs-container">
        {jobs.length > 0 ? (
          <ul className="jobs-list">
            {jobs.map(job => (
              <Link to={`/jobs/${job.id}`} className="job-link" key={job.id}>
                <li className="job-item">
                  <div className="job-header">
                    <img
                      src={job.company_logo_url}
                      alt="company logo"
                      className="company-logo"
                    />
                    <div className="job-title-rating">
                      <h4 className="job-title">{job.title}</h4>
                      <p className="job-rating">
                        <span className="star-icon">⭐</span> {job.rating}
                      </p>
                    </div>
                  </div>
                  <div className="job-details">
                    <p className="job-location">
                      <i className="fas fa-map-marker-alt location-icon" />{' '}
                      {job.location}
                    </p>
                    <p className="job-employment">
                      <i className="fas fa-briefcase employment-icon" />{' '}
                      {job.employment_type}
                    </p>
                  </div>
                  <hr className="divider" />
                  <h1>Description</h1>
                  <p className="job-description">{job.job_description}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="no-jobs-found">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="No jobs"
              className="no-jobs-image"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )}
      </div>
    )
  }

  return <p>Loading...</p>
}

export default JobsList
