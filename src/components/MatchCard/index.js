import './index.css'

const MatchCard = ({details}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = details
  const statusClass = matchStatus === 'Won' ? 'status-won' : 'status-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-logo"
      />
      <p className="match-team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
