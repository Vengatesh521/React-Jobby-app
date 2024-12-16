import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'Full Time',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'Part Time',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'Freelance',
  },
  {
    label: 'Internship',
    employmentTypeId: 'Internship',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = ({updateFilters, onCheckboxChange, onRadioChange}) => (
  <div className="filters">
    {/* Employment Type Filter */}
    <div>
      <h1>Type of Employment</h1>
      {employmentTypesList.map(({label, employmentTypeId}) => (
        <div key={employmentTypeId} className="filter-item">
          <label>
            <input
              type="checkbox"
              name={employmentTypeId}
              value={employmentTypeId}
              onChange={onCheckboxChange}
              aria-label={`Filter by ${label}`}
            />
            {label}
          </label>
        </div>
      ))}
    </div>

    {/* Salary Range Filter */}
    <div>
      <h1>Salary Range</h1>
      {salaryRangesList.map(({label, salaryRangeId}) => (
        <div key={salaryRangeId} className="filter-item">
          <label>
            <input
              type="radio"
              name="salary"
              value={salaryRangeId}
              onChange={onRadioChange}
              aria-label={`Filter by salary range: ${label}`}
            />
            {label}
          </label>
        </div>
      ))}
    </div>
  </div>
)

export default Filters
