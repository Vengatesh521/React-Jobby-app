import {Link} from 'react-router-dom'
import './index.css'

const JobsList = ({jobs, apiStatus}) => {
  if (apiStatus === 'FAILURE') {
    return <p>Something went wrong. Please try again.</p>
  }

  if (apiStatus === 'NO_DATA') {
    return <p>No jobs found.</p>
  }

  if (apiStatus === 'SUCCESS') {
    return (
      <div className="jobs-container">
        {jobs.length > 0 ? (
          <ul className="jobs-list">
            {jobs.map(job => (
              <Link to={`/jobs/${job.id}`} className="job-link">
                <li key={job.id} className="job-item">
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
          </div>
        )}
      </div>
    )
  }

  return <p>Loading...</p>
}

export default JobsList
