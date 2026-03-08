import './index.css'

const LatestMatch = ({details}) => {
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = details

  return (
    <div className="latest-match-card">
      <div className="latest-match-main">
        <div>
          <p className="team-name">{competingTeam}</p>
          <p>{date}</p>
          <p>{venue}</p>
          <p>{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="team-logo"
        />
      </div>
      <hr />
      {/* Required paragraphs */}
      <p>{firstInnings}</p>
      <p>{secondInnings}</p>
      <p>{manOfTheMatch}</p>
      <p>{umpires}</p>
    </div>
  )
}

export default LatestMatch
