/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  formatMatchData = match => ({
    umpires: match.umpires,
    result: match.result,
    manOfTheMatch: match.man_of_the_match,
    id: match.id,
    date: match.date,
    venue: match.venue,
    competingTeam: match.competing_team,
    competingTeamLogo: match.competing_team_logo,
    firstInnings: match.first_innings,
    secondInnings: match.second_innings,
    matchStatus: match.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params
    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()

      const updatedLatestMatch = this.formatMatchData(data.latest_match_details)
      const updatedRecentMatches = data.recent_matches.map(this.formatMatchData)

      this.setState({
        teamBannerUrl: data.team_banner_url,
        latestMatch: updatedLatestMatch,
        recentMatches: updatedRecentMatches,
        isLoading: false,
      })
    } catch (e) {
      this.setState({isLoading: false})
    }
  }

  getMatchStatistics = () => {
    const {recentMatches, latestMatch} = this.state
    const allMatches = [latestMatch, ...recentMatches]

    let won = 0
    let lost = 0
    let drawn = 0

    allMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  renderPieChart = () => {
    const data = this.getMatchStatistics()
    const colors = ['#18ed96', '#e31a1a', '#f7c545']

    return (
      <div className="pie-chart-container">
        <h2 className="pie-chart-title">Match Statistics</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({name, value}) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={colors[index]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{color: '#ffffff', fontSize: '14px'}}
          />
        </PieChart>
      </div>
    )
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatches, isLoading} = this.state

    return (
      <div className="team-matches-container">
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
          <div>
            <button
              type="button"
              className="back-button"
              onClick={this.onClickBack}
            >
              Back
            </button>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            {this.renderPieChart()}
            <h2 className="latest-matches-title">Latest Matches</h2>
            <LatestMatch details={latestMatch} />
            <ul className="recent-matches-list">
              {recentMatches.map(match => (
                <MatchCard key={match.id} details={match} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
