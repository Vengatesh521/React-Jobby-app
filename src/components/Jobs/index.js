import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import Filters from '../Filters'
import JobsList from '../JobsList'

import './index.css'

class Jobs extends Component {
  state = {
    jobs: [],
    filters: {
      employmentType: [], // array to hold selected employment types (checkbox)
      salaryRange: '', // single value for salary range (radio button)
      searchTerm: '', // search term
    },
    isLoading: true,
    apiStatus: 'INITIAL', // 'SUCCESS', 'FAILURE', 'NO_DATA'
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {filters} = this.state
    const {employmentType, salaryRange, searchTerm} = filters

    // Construct URL with search term, employment types, and salary range
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchTerm}`

    console.log('API URL:', url)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          jobs: data.jobs,
          apiStatus: data.jobs.length === 0 ? 'NO_DATA' : 'SUCCESS',
          isLoading: false,
        })
      } else {
        this.setState({
          apiStatus: 'FAILURE',
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        apiStatus: 'FAILURE',
        isLoading: false,
      })
    }
  }

  updateFilters = updatedFiltersCallback => {
    this.setState(
      prevState => ({
        filters: updatedFiltersCallback(prevState.filters),
      }),
      this.getJobsData, // Call API after updating filters
    )
  }

  handleSearchChange = event => {
    const searchTerm = event.target.value
    this.setState(
      prevState => ({
        filters: {...prevState.filters, searchTerm},
      }),
      this.getJobsData, // Fetch jobs after search term change
    )
  }

  handleCheckboxChange = event => {
    const {name, checked} = event.target
    this.setState(prevState => {
      const updatedEmploymentType = checked
        ? [...prevState.filters.employmentType, name]
        : prevState.filters.employmentType.filter(
            employment => employment !== name,
          )
      return {
        filters: {...prevState.filters, employmentType: updatedEmploymentType},
      }
    }, this.getJobsData) // Fetch jobs after filter change
  }

  handleRadioChange = event => {
    const {value} = event.target
    this.setState(
      prevState => ({
        filters: {...prevState.filters, salaryRange: value},
      }),
      this.getJobsData, // Fetch jobs after radio change
    )
  }

  filterJobs = () => {
    const {jobs, filters} = this.state
    const {employmentType, salaryRange, searchTerm} = filters

    return jobs.filter(job => {
      // Employment Type Filter
      const matchesEmploymentType =
        employmentType.length === 0 ||
        employmentType.includes(job.employment_type)

      // Salary Range Filter
      const matchesSalaryRange =
        salaryRange === '' ||
        parseInt(job.package_per_annum) >= parseInt(salaryRange)

      // Search Term Filter
      const matchesSearchTerm = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return matchesEmploymentType && matchesSalaryRange && matchesSearchTerm
    })
  }

  render() {
    const {isLoading, apiStatus} = this.state
    const filteredJobs = this.filterJobs()

    return (
      <div className="jobs-page">
        {/* Profile Section */}
        <div className="profile-container">
          <Profile />
        </div>

        {/* Search Section */}
        <div className="search-container">
          <input
            type="search"
            placeholder="Search for jobs..."
            className="search-input"
            onChange={this.handleSearchChange}
          />
          <button
            type="button"
            className="search-icon"
            aria-label="Search jobs"
            data-testid="searchButton" // Correct attribute for test ID
          >
            Search
          </button>
        </div>

        {/* Filters and Jobs List */}
        <div className="content-container">
          <div className="filters-container">
            <Filters
              updateFilters={this.updateFilters}
              onCheckboxChange={this.handleCheckboxChange}
              onRadioChange={this.handleRadioChange}
            />
          </div>
          <div className="jobs-list-container">
            <JobsList
              jobs={filteredJobs}
              isLoading={isLoading}
              apiStatus={apiStatus}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
