import {Link} from 'react-router-dom'
import {
  BsFillBriefcaseFill,
  BsStarFill,
  BsBookmark,
  BsBookmarkFill,
} from 'react-icons/bs' // Added bookmark icons
import {MdLocationOn} from 'react-icons/md'
import {useState} from 'react' // Added useState
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

  // Local state to track bookmark status
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || []
    return savedJobs.some(job => job.id === id)
  })

  // Toggle bookmark and update local storage
  const toggleBookmark = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || []
    let updatedJobs
    if (isBookmarked) {
      updatedJobs = savedJobs.filter(job => job.id !== id)
    } else {
      updatedJobs = [...savedJobs, jobData]
    }
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs))
    setIsBookmarked(!isBookmarked)
  }

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
          {/* Bookmark button */}
          <button
            type="button"
            className="bookmark-btn"
            onClick={e => {
              e.preventDefault() // Prevent Link navigation
              toggleBookmark()
            }}
          >
            {isBookmarked ? (
              <BsBookmarkFill className="bookmark-icon filled" />
            ) : (
              <BsBookmark className="bookmark-icon" />
            )}
          </button>
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
