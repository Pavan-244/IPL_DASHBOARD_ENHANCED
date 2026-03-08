/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      const updatedData = data.teams.map(team => ({
        id: team.id,
        name: team.name,
        teamImageUrl: team.team_image_url,
      }))
      this.setState({teamsList: updatedData, isLoading: false})
    } catch (e) {
      // even on failure we should remove loader to avoid infinite wait
      this.setState({isLoading: false})
    }
  }

  renderTeamsList = () => {
    const {teamsList} = this.state
    return (
      <ul className="teams-list">
        {teamsList.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        <div className="ipl-logo-title">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="home-title">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          // keep both attributes to satisfy tests + RTL
          <div
            testid="loader"
            data-testid="loader"
            className="loader-container"
          >
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamsList()
        )}
      </div>
    )
  }
}

export default Home
