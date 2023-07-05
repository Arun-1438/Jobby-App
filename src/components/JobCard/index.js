import {Link} from 'react-router-dom'

import {MdLocationOn, MdLaptopMac} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <Link className="link-item" to={`jobs/${id}`}>
      <li className="job-card">
        <div className="comp-profile">
          <img src={companyLogoUrl} alt={title} />
          <div>
            <h1>{title}</h1>
            <div>
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="comp-add">
          <div>
            <div>
              <MdLocationOn className="add" />
              <p className="add">{location}</p>
            </div>
            <div>
              <MdLaptopMac className="add" />
              <p className="add">{employmentType}</p>
            </div>
          </div>
          <h3>{packagePerAnnum}</h3>
        </div>
        <hr className="hr-line" />
        <h1 className="desc-title">Description</h1>
        <p className="desc-cont">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
