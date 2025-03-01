import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {
      skills: [],
      lifeAtCompany: {},
    },
    similarJobs: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedJobDetails = {
          title: data.job_details.title,
          rating: data.job_details.rating,
          location: data.job_details.location,
          employmentType: data.job_details.employment_type,
          packagePerAnnum: data.job_details.package_per_annum,
          companyWebsiteUrl: data.job_details.company_website_url,
          companyLogoUrl: data.job_details.company_logo_url,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills,
          lifeAtCompany: data.job_details.life_at_company,
        }
        const updatedSimilarJobs = data.similar_jobs.map(job => ({
          id: job.id,
          title: job.title,
          companyLogoUrl: job.company_logo_url,
          companyName: job.company_name,
          location: job.location,
          employmentType: job.employment_type,
          job_description: job.job_description,
        }))
        this.setState({
          jobDetails: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
          isLoading: false,
        })
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch {
      this.setState({hasError: true, isLoading: false})
    }
  }

  renderSkills = skills =>
    skills.map(skill => (
      <div key={skill.name} className="skill-item">
        <img src={skill.image_url} alt={skill.name} className="skill-icon" />
        <p className="skill-name">{skill.name}</p>
      </div>
    ))

  renderSimilarJobs = similarJobs =>
    similarJobs.map(job => (
      <div key={job.id} className="similar-job-card">
        <img
          src={job.companyLogoUrl}
          alt="job details company logo"
          className="company-logo"
        />
        <div className="job-card-details">
          <h3>{job.title}</h3>
          <p className="company-name">{job.companyName}</p>
          <p className="job-location">
            <i className="fas fa-map-marker-alt" />
            {job.location}
          </p>
          <p className="employment-type">
            <i className="fas fa-briefcase" />
            {job.employmentType}
          </p>
          <h1>Description</h1>
          <p>{job.job_description}</p>
        </div>
      </div>
    ))

  render() {
    const {jobDetails, similarJobs, isLoading, hasError} = this.state

    if (isLoading) {
      return (
        <div className="loader" data-testid="loader">
          Loading...
        </div>
      )
    }

    if (hasError) {
      return (
        <div className="error-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
            className="company-logo"
          />
          <h1 className="error">Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button type="button" onClick={this.fetchJobDetails}>
            Retry
          </button>
        </div>
      )
    }

    const {
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <>
        {' '}
        <Header />
        <div className="job-details-page">
          <div className="job-details-card">
            <div className="job-header">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="job-header-details">
                <h1>{title}</h1>
                <p className="rating">{rating}</p>
                <p className="salary">{packagePerAnnum}</p>
              </div>
            </div>
            <div className="job-info">
              <p className="job-location">
                <i className="fas fa-map-marker-alt" />
                {location}
              </p>
              <p className="employment-type">
                <i className="fas fa-briefcase" />
                {employmentType}
              </p>
            </div>
            <hr />
            <h1>Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
            <p>{jobDescription}</p>
            <h1>Skills</h1>
            <div className="skills-container">{this.renderSkills(skills)}</div>
            <h1>Life at Company</h1>
            <p>{lifeAtCompany?.description || ''}</p>
            {lifeAtCompany?.image_url && (
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="company-life-image"
              />
            )}
          </div>
          <div className="similar-jobs-section">
            <h1>Similar Jobs</h1>
            <ul className="similar-jobs-container">
              {this.renderSimilarJobs(similarJobs)}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
