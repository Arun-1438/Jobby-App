import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const Protected = props => {
  const jwtToken = Cookies.get('jwt_token')
  // console.log(props)
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default Protected
