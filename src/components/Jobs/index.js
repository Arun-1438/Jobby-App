import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.

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

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profile: true,
    jobs: true,
    profileData: {},
    jobsDataList: [],
    isLoadingProfile: false,
    isLoadingjobs: false,
    userInput: '',
    employmentType: [],
    salaryRange: 1000000,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsData()
  }

  onChangeEmployment = event => {
    this.getJobsData()
    const {employmentType} = this.state
    if (employmentType.includes(event.target.value) && event.target.checked) {
      const filteredEmploymentType = employmentType.filter(
        each => each !== event.target.value,
      )
      this.setState({employmentType: [...filteredEmploymentType]})
    } else {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, event.target.value],
      }))
    }
  }

  getProfile = async () => {
    this.setState({isLoadingProfile: false})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const userData = await response.json()

      const camelUserData = {
        name: userData.profile_details.name,
        profileImageUrl: userData.profile_details.profile_image_url,
        shortBio: userData.profile_details.short_bio,
      }
      // console.log(camelUserData)
      this.setState({profileData: camelUserData, isLoadingProfile: true})
    } else {
      this.setState({profile: false, isLoadingProfile: true})
    }
  }

  getJobsData = async () => {
    this.setState({isLoadingjobs: false})
    const jwtToken = Cookies.get('jwt_token')
    const {userInput, salaryRange, employmentType} = this.state
    console.log(employmentType)

    const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=${salaryRange}&search=${userInput.toLowerCase()}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jobsData = await response.json()

      // console.log(jobsData)

      const formatedJobsData = jobsData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      // console.log(jobsData.jobs)
      this.setState({jobsDataList: formatedJobsData, isLoadingjobs: true})
    } else {
      this.setState({jobs: false, isLoadingjobs: true})
    }
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onSearchJob = () => {
    this.getJobsData()
  }

  profileTry = () => {
    this.getProfile()
  }

  jobsTry = () => {
    this.getJobsData()
  }

  renderJobs = () => {
    const {jobsDataList, userInput, jobs} = this.state
    return (
      <>
        {jobs ? (
          <div className="jobs-content">
            <div className="search">
              <input
                value={userInput}
                onChange={this.onChangeUserInput}
                type="search"
                placeholder="Search"
              />
              <div className="search-div">
                <button
                  data-testid="searchButton"
                  onClick={this.onSearchJob}
                  type="button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <ul className="jobs-list-cont">
              {jobsDataList.map(each => (
                <JobCard key={each.id} jobDetails={each} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="jobs-error-content">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We Cannot seem to find the page tou are looking for.</p>
            <button
              onClick={this.jobsTry}
              type="button"
              className="custom-button"
            >
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  renderProfile = () => {
    const {profile, profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <>
        {' '}
        {profile ? (
          <div className="profile">
            <img src={profileImageUrl} alt="profile" />
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        ) : (
          <div className="profile-error">
            <button
              onClick={this.profileTry}
              type="button"
              className="custom-button"
            >
              Try
            </button>
          </div>
        )}
      </>
    )
  }

  renderEmployement = () => (
    <>
      <hr className="h-line" />
      <h1>Type of Employment</h1>
      <ul className="list-cont">
        {employmentTypesList.map(each => (
          <li className="list-item" key={each.employmentTypeId}>
            <input
              onChange={this.onChangeEmployment}
              value={each.employmentTypeId}
              type="checkbox"
              id={each.employmentTypeId}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="h-line" />
    </>
  )

  onChangeSalary = event => {
    this.setState({salaryRange: event.target.value})
    this.getJobsData()
  }

  renderSalary = () => (
    <>
      <h1>Salary Range</h1>
      <ul className="list-cont">
        {salaryRangesList.map(each => (
          <li className="list-item" key={each.salaryRangeId}>
            <input
              onChange={this.onChangeSalary}
              type="radio"
              id={each.salaryRangeId}
              name="salary-range"
              value={each.salaryRangeId}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="h-line" />
    </>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="white" height="100" width="80" />
    </div>
  )

  render() {
    const {isLoadingProfile, isLoadingjobs} = this.state
    return (
      <>
        <Header />
        <div className="main">
          <div className="jobs">
            <div className="sidebar">
              {isLoadingProfile ? this.renderProfile() : this.renderLoader()}
              {this.renderEmployement()}
              {this.renderSalary()}
            </div>
            {isLoadingjobs ? this.renderJobs() : this.renderLoader()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
