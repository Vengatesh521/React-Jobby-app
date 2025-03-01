import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FilterGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const Locations = [
  {label: 'Delhi', employmentTypeId: 'DELHI'},
  {label: 'Hyderabad', employmentTypeId: 'HYDERABAD'},
]

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employeeTypeList: [],
    locationList: [],
    minimumSalary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {
      employeeTypeList,
      locationList,
      minimumSalary,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeList.join(
      ',',
    )}&location=${locationList.join(
      ',',
    )}&minimum_package=${minimumSalary}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const updatedJobsData = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
          location: eachJob.location, // Added location to job data
        }))
        this.setState({
          jobsList: updatedJobsData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const renderJobsList = jobsList.length > 0

    return renderJobsList ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeSalary = salaryRangeId => {
    this.setState({minimumSalary: salaryRangeId}, this.getJobsData)
  }

  changeEmployeeList = type => {
    const {employeeTypeList} = this.state
    const inputNotInList = employeeTypeList.includes(type)

    if (!inputNotInList) {
      this.setState(
        prevState => ({
          employeeTypeList: [...prevState.employeeTypeList, type],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = employeeTypeList.filter(
        eachItem => eachItem !== type,
      )
      this.setState({employeeTypeList: filteredData}, this.getJobsData)
    }
  }

  changeLocationList = type => {
    const {locationList} = this.state
    const inputNotInList = locationList.includes(type)

    if (!inputNotInList) {
      this.setState(
        prevState => ({
          locationList: [...prevState.locationList, type],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = locationList.filter(eachItem => eachItem !== type)
      this.setState({locationList: filteredData}, this.getJobsData)
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <FilterGroup
              employmentTypesList={employmentTypesList}
              locationsList={Locations}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobs={this.getJobsData}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
              changeLocationList={this.changeLocationList}
            />
            <div className="search-input-jobs-list-container">
              <div className="search-input-container-desktop">
                <input
                  type="search"
                  className="search-input-desktop"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.changeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-button-container-desktop"
                  onClick={this.getJobsData}
                >
                  <BsSearch className="search-icon-desktop" />
                </button>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
