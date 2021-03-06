import React, { PureComponent } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ListItemDialog from "../components/ListItemDialog.jsx";

const format = "HH:mm DD-MM-YYYY";

const initialState = {
    startDate: moment().minutes(0).format(format),
    endDate: moment().minutes(30).format(format),
    gameType: "standard",
    name: "",
    gameName: "",
    game: null,
    tournamentType: null,
    minPlayers: "0",
    maxPlayers: "2",
    users: []
};

const propTypes = {
    model: PropTypes.object,
    type: PropTypes.string,
    close: PropTypes.func.isRequired
};

const defaultProps = {
    model: null,
    type: null
};

class ListItemDialogContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };

        this.setEndDate = this.setEndDate.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.setName = this.setName.bind(this);
        this.setGameType = this.setGameType.bind(this);
        this.setMinPlayers = this.setMinPlayers.bind(this);
        this.setMaxPlayers = this.setMaxPlayers.bind(this);
        this.setGameName = this.setGameName.bind(this);
        this.save = this.save.bind(this);
        this.setGame = this.setGame.bind(this);
        this.setTournamentType = this.setTournamentType.bind(this);
    }

    componentWillReceiveProps({ type, model }) {
        if (type !== this.props.type || model !== this.props.model) {
            if (model) {
                const gameType = model.gameName ? "custom" : "standard";

                this.setState({
                    ...model,
                    gameType,
                    startDate: moment(model.startDate).format(format),
                    endDate: moment(model.endDate).format(format),
                    minPlayers: model.minPlayers.toString(),
                    maxPlayers: model.maxPlayers.toString()
                });
            } else {
                this.setState({
                    ...initialState,
                    __uid: Date.now()
                });
            }
        }
    }

    setStartDate({ target }) {
        const startDate = target.value;

        this.setState({
            startDate
        });
    }

    setEndDate({ target }) {
        const endDate = target.value;

        this.setState({
            endDate
        });
    }

    setGameType({ target }) {
        const gameType = target.value;

        this.setState({
            gameType
        });
    }

    setName({ target }) {
        const name = target.value;

        this.setState({
            name
        });
    }

    setMinPlayers({ target }) {
        const minPlayers = target.value;

        this.setState({
            minPlayers
        });
    }

    setMaxPlayers({ target }) {
        const maxPlayers = target.value;

        this.setState({
            maxPlayers
        });
    }

    setGameName({ target }) {
        const gameName = target.value;

        this.setState({
            gameName
        });
    }

    setGame({ value }) {
        this.setState({
            game: value
        });
    }

    setTournamentType({ value }) {
        this.setState({
            tournamentType: value
        });
    }

    genericPayload() {
        const startDate = moment(this.state.startDate, format).unix() * 1000;
        const endDate = moment(this.state.endDate, format).unix() * 1000;
        const minPlayers = parseInt(this.state.minPlayers, 10);
        const maxPlayers = parseInt(this.state.maxPlayers, 10);
        const { __uid, users } = this.state;

        return {
            __uid,
            startDate,
            endDate,
            users,
            minPlayers,
            maxPlayers
        };
    }

    sparringPayload() {
        const { game, gameType, gameName } = this.state;
        const payload = gameType === "standard" ? {
            game
        } : {
            gameName
        };

        return {
            ...this.genericPayload(),
            ...payload
        };
    }

    tournamentPayload() {
        const { game, name, tournamentType } = this.state;

        return {
            ...this.genericPayload(),
            name,
            game,
            type: tournamentType
        };
    }

    save() {
        const { type } = this.props;
        const payload = type === "tournament" ? this.tournamentPayload() : this.sparringPayload();

        this.props.close({
            type,
            payload
        });
    }

    render() {
        return (
            <ListItemDialog
                {...this.state}
                {...this.props}
                save={this.save}
                setStartDate={this.setStartDate}
                setEndDate={this.setEndDate}
                setName={this.setName}
                setGameType={this.setGameType}
                setMinPlayers={this.setMinPlayers}
                setMaxPlayers={this.setMaxPlayers}
                setGameName={this.setGameName}
                setGame={this.setGame}
                setTournamentType={this.setTournamentType}
            />
        );
    }
}

ListItemDialogContainer.propTypes = propTypes;
ListItemDialogContainer.defaultProps = defaultProps;

export default ListItemDialogContainer;
