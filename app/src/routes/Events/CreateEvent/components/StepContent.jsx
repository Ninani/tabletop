import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import DetailsStep from "./DetailsStep.jsx";
import ListStep from "./ListStep.jsx";

const propTypes = {
    step: PropTypes.number.isRequired,
    setName: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    name: PropTypes.string,
    setRef: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    description: PropTypes.string,
    sparrings: PropTypes.array.isRequired,
    tournaments: PropTypes.array.isRequired,
    removeSparring: PropTypes.func.isRequired,
    editSparring: PropTypes.func.isRequired,
    removeTournament: PropTypes.func.isRequired,
    editTournament: PropTypes.func.isRequired,
    addSparring: PropTypes.func.isRequired,
    addTournament: PropTypes.func.isRequired,
    toggleSparringParticipation: PropTypes.func.isRequired,
    toggleTournamentParticipation: PropTypes.func.isRequired,
    location: PropTypes.object
};

const defaultProps = {
    name: "",
    description: "",
    location: null
};

const enhance = pure;

const StepContent = ({ step, setLocation, setDescription, setName, name, description, sparrings, removeSparring, editSparring, tournaments,
removeTournament, editTournament, addSparring, addTournament, toggleSparringParticipation, toggleTournamentParticipation, setRef, clearInput,
location }) => {
    if (step === 0) {
        return (
            <DetailsStep
                setLocation={setLocation}
                setDescription={setDescription}
                setName={setName}
                setRef={setRef}
                clearInput={clearInput}
                name={name}
                description={description}
                location={location}
            />
        );
    } else if (step === 1) {
        return (
            <ListStep
                data={sparrings}
                remove={removeSparring}
                edit={editSparring}
                add={addSparring}
                label="No sparrings"
                toggle={toggleSparringParticipation}
            />
        );
    } else if (step === 2) {
        return (
            <ListStep
                data={tournaments}
                remove={removeTournament}
                edit={editTournament}
                add={addTournament}
                label="No tournaments"
                toggle={toggleTournamentParticipation}
            />
        );
    }

    return null;
};

StepContent.propTypes = propTypes;
StepContent.defaultProps = defaultProps;

export default enhance(StepContent);
