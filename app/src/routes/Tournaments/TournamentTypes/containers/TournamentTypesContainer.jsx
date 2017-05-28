import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTournamentTypes } from "../../../../store/tournament";
import "../../components/Tournament.scss";
import TournamentTypes from "../components/TournamentTypes";

const propTypes = {
    tournamentTypesList: PropTypes.array,
    router: PropTypes.object.isRequired,
    playDemo: PropTypes.func,
    getTournamentTypes: PropTypes.func
};

const defaultProps = {
    tournamentTypesList: [],
    playDemo: () => {},
    getTournamentTypes: () => {}
};

const mapDispatchToProps = dispatch => ({
    getTournamentTypes: (callback) => {
        dispatch(getTournamentTypes(callback));
    }
});

const mapStateToProps = state => ({
    tournamentTypesList: state.tournament.tournamentTypesList
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

class TournamentTypesContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            demoView: false
        };
        this.getTournamentTypes = this.getTournamentTypes.bind(this);
        this.playDemo = this.playDemo.bind(this);
    }

    componentWillMount() {
        this.getTournamentTypes();
    }

    getTournamentTypes() {
        this.props.getTournamentTypes(({ ok }) => {
            if (!ok) {
                console.log("Fetching Final results failed");
            }
        });
    }

    playDemo = () => {
        this.setState({
            demoView: true
        });
    };

    render() {
        return (
            <TournamentTypes
                tournamentTypesList={this.props.tournamentTypesList}
                router={this.props.router}
                demoView={this.state.demoView}
                playDemo={this.playDemo}
            />
        );
    }

}

TournamentTypesContainer.propTypes = propTypes;
TournamentTypesContainer.defaultProps = defaultProps;

export default enhance(TournamentTypesContainer);
