import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    locationsList,
    salaryRangesList,
    searchInput,
    changeSearchInput,
    getJobs,
    changeEmployeeList,
    changeSalary,
    changeLocationList,
  } = props

  const onChangeSearchInput = event => {
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-button-container"
        onClick={getJobs}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const onSelectEmployeeType = event => {
    changeEmployeeList(event.target.value)
  }

  const renderTypeOfEmployment = () => (
    <div className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employee-type-list-container">
        {employmentTypesList.map(eachEmployeeType => (
          <li className="employee-item" key={eachEmployeeType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachEmployeeType.employmentTypeId}
              className="check-input"
              value={eachEmployeeType.employmentTypeId}
              onChange={onSelectEmployeeType}
            />
            <label
              htmlFor={eachEmployeeType.employmentTypeId}
              className="check-label"
            >
              {eachEmployeeType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const onSelectLocation = event => {
    changeLocationList(event.target.value)
  }

  const renderLocations = () => (
    <div className="locations-container">
      <h1 className="locations-heading">Locations</h1>
      <ul className="locations-list-container">
        {locationsList.map(eachLocation => (
          <li className="location-item" key={eachLocation.employmentTypeId}>
            <input
              type="checkbox"
              id={eachLocation.employmentTypeId}
              className="check-input"
              value={eachLocation.employmentTypeId}
              onChange={onSelectLocation}
            />
            <label
              htmlFor={eachLocation.employmentTypeId}
              className="check-label"
            >
              {eachLocation.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => {
    if (!salaryRangesList) return null

    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachSalary => {
            const onClickSalary = () => {
              changeSalary(eachSalary.salaryRangeId)
            }
            return (
              <li
                className="salary-item"
                key={eachSalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="check-input"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="check-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderLocations()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
