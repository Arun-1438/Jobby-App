import {Component} from 'react'
import Cookies from 'js-cookie'

import {MdLocationOn, MdLaptopMac} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {FaShareSquare} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

class JobDetails extends Component {
  state = {data: true, similarJobs: [], jobDetails: {}, isLoading: false}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: false})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(params)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const formatedSimilarJobs = formatedData.similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(formatedData.jobDetails)
      const formatedJobDetails = {
        companyLogoUrl: formatedData.jobDetails.company_logo_url,
        employmentType: formatedData.jobDetails.employment_type,
        jobDescription: formatedData.jobDetails.job_description,
        companyWebsiteUrl: formatedData.jobDetails.company_website_url,
        location: formatedData.jobDetails.location,
        packagePerAnnum: formatedData.jobDetails.package_per_annum,
        rating: formatedData.jobDetails.rating,
        title: formatedData.jobDetails.title,
        lifeAtCompany: {
          description: formatedData.jobDetails.life_at_company.description,
          imageUrl: formatedData.jobDetails.life_at_company.image_url,
        },
        skills: formatedData.jobDetails.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }
      this.setState({
        similarJobs: formatedSimilarJobs,
        jobDetails: formatedJobDetails,
        isLoading: true,
        data: true,
      })
    } else {
      this.setState({isLoading: true, data: false})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    console.log(similarJobs)
    return (
      <ul
        className="similar-details-card"
        style={{display: 'flex', columnGap: '20px', rowGap: '20px'}}
      >
        {similarJobs.map(each => (
          <JobCard key={each.id} className="li" jobDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="white" height="100" width="80" />
    </div>
  )

  pageReffresh = () => this.getJobDetails()

  renderJobDetailsCard = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      companyWebsiteUrl,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails
    console.log(skills)
    return (
      <div className="job-details-card">
        <div className="comp-profile">
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <p>{employmentType}</p>
            <div>
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="comp-add">
          <ul className="details-cont">
            <li className="details">
              <MdLocationOn className="add" />
              <p className="add">{location}</p>
            </li>
            <li className="details">
              <MdLaptopMac className="add" />
              <p className="add">InternShip</p>
            </li>
          </ul>
          <p>{packagePerAnnum}</p>
        </div>
        <div className="description-const">
          <div className="title-cont">
            <h1>Description</h1>
            <a
              className="link"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <FaShareSquare className="icon" />
            </a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <div className="skills-cont">
          <h1>Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <li key={each.name}>
                <p>{each.name}</p>
                <img src={each.imageUrl} alt={each.name} />
              </li>
            ))}
          </ul>
        </div>
        <div className="life-at-container">
          <h1>Life At Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="lifeatlogo" />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {jobDetails, isLoading, data} = this.state
    console.log(jobDetails)
    return (
      <>
        <Header />
        <div className="job-item-details">
          {data ? (
            <div>
              {isLoading ? this.renderJobDetailsCard() : this.renderLoader()}
              <ul className="list-cont">
                {isLoading ? this.renderSimilarJobs() : this.renderLoader()}
              </ul>
            </div>
          ) : (
            <div className="error-cont">
              {isLoading ? (
                <>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="errorimage"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We Cannot seem to find the page tou are looking for.</p>
                  <button
                    onClick={this.pageReffresh}
                    type="button"
                    className="custom-button"
                  >
                    Try
                  </button>
                </>
              ) : (
                this.renderLoader()
              )}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default JobDetails
