import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import { DialogContent } from "../../../../components/Dialog";
import IconTextfield from "../../../../components/IconTextfield";
import GameSelect from "../../../../components/GameSelect";
import TypeSelect from "./TypeSelect.jsx";
import PlayersCount from "./PlayersCount.jsx";
import DateRange from "./DateRange.jsx";

const propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    game: PropTypes.string,
    setTournamentType: PropTypes.func.isRequired,
    tournamentType: PropTypes.string,
    minPlayers: PropTypes.string,
    maxPlayers: PropTypes.string,
    setMinPlayers: PropTypes.func.isRequired,
    setMaxPlayers: PropTypes.func.isRequired
};

const defaultProps = {
    game: null,
    tournamentType: null,
    minPlayers: "0",
    maxPlayers: "2"
};

const enhance = pure;

/* eslint-disable jsx-a11y/anchor-has-content */
const SparringDialogContent = ({ setName, name, startDate, endDate, setStartDate, setEndDate, game, setGame, setTournamentType, tournamentType,
minPlayers, setMinPlayers, maxPlayers, setMaxPlayers }) => (
    <DialogContent>
        <a tabIndex={0} className="create-event-dialog__focus-trap" />
        <IconTextfield
            label="Tournament name"
            icon="stars"
            value={name}
            onChange={setName}
            required
        />
        <DateRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
        <div className="create-event-dialog__group">
            <GameSelect
                onChange={setGame}
                value={game}
            />
            <TypeSelect
                onChange={setTournamentType}
                value={tournamentType}
            />
        </div>
        <PlayersCount
            minPlayers={minPlayers}
            maxPlayers={maxPlayers}
            setMinPlayers={setMinPlayers}
            setMaxPlayers={setMaxPlayers}
        />
    </DialogContent>
);

SparringDialogContent.propTypes = propTypes;
SparringDialogContent.defaultProps = defaultProps;

export default enhance(SparringDialogContent);
