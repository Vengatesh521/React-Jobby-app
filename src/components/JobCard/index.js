import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = ({jobData}) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="rating-heading" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="location-employee-container">
          <div className="loaction-container">
            <MdLocationOn className="loaction-icon" />
            <p className="loaction-heading">{location}</p>
          </div>
          <div className="employee-type-container">
            <BsFillBriefcaseFill className="brief-case-icon" />
            <p className="employee-type-heading">{employmentType}</p>
          </div>
          <p className="package-heading">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
