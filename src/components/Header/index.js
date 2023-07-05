import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    console.log(props)
    Cookies.remove('jwt_token')
  }

  return (
    <div className="header">
      <div className="desc-nav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button onClick={onClickLogout} type="button" className="custom-btn">
          Logout
        </button>
      </div>
      <div className="mobile-nav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
        />
        <ul>
          <Link to="/">
            <li>
              <i className="fa-solid fa-house" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <i className="fa-solid fa-briefcase" />
            </li>
          </Link>
          <li onClick={onClickLogout}>
            <i className="fa-solid fa-right-from-bracket" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
