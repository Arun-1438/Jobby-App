import Header from '../Header'
import './index.css'

const Home = props => {
  const saveBtnClick = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home">
      <Header />
      <div className="content">
        <h1>Find The Job That Fits Your Life</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <p>
          Millions of people are searching for jobs Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Ea nostrum dolores officia quos
          praesentium aspernatur deserunt deleniti, pariatur debitis, culpa
          excepturi soluta ullam! Consectetur itaque dignissimos quos provident
          sapiente distinctio!
        </p>
        <button onClick={saveBtnClick} type="button" className="custom-btn">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
