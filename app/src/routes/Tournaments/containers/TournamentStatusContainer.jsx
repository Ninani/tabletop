import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getState, initialRound} from "../../../store/tournament";
import TournamentStatus from "../components/TournamentStatus";

const propTypes = {
  tournamentId: PropTypes.number,
  tournamentName: PropTypes.string,
  pairs: PropTypes.arrayOf(PropTypes.shape({
    host: PropTypes.object.isRequired,
    guest: PropTypes.object.isRequired,
    hostResult: PropTypes.number.isRequired,
    guestResult: PropTypes.number.isRequired,
    winner: PropTypes.number.isRequired
  })),
  finishTournament: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = ({tournament}) => ({
  pairs: tournament.pairs,
  tournamentName: "MyTournament"
});

const mapDispatchToProps = dispatch => ({
  getState: (id) => {
    dispatch(getState(id));
  }
});

const defaultProps = {};

class TournamentStatusContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.getState = this.getState.bind(this);
  }

  componentWillMount() {
    this.getState();
  }

  getState() {
    const tournamentId = this.props.tournamentId;
    this.props.getState(tournamentId, ({ok}) => {
    });
  }

  render() {
    return (
      <TournamentStatus
        pairs={this.props.pairs}
        tournamentName={this.props.tournamentName}
        tournamentId={this.props.tournamentId}
        finishTournament={this.props.finishTournament}
        router={this.props.router}
      />
    )
  }
}

TournamentStatusContainer.propTypes = propTypes;
TournamentStatusContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(TournamentStatusContainer);
