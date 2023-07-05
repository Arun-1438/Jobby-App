import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
  }

  onSubmitError = errorMessage => {
    this.setState({showSubmitError: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          value={username}
          onChange={this.onChangeUsername}
          type="text"
          id="username"
          placeholder="USERNAME"
        />
      </>
    )
  }

  renderUserPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="userpassword">PASSWORD</label>
        <input
          value={password}
          onChange={this.onChangePassword}
          type="password"
          id="userpassword"
          placeholder="PASSWORD"
        />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="Website logo"
          />
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderUserPassword()}</div>
          <button className="custom-btn" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
