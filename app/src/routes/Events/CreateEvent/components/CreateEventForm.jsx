import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import compose from "recompose/compose";
import Spinner from "react-mdl/lib/Spinner";
import StepHeader from "./StepHeader.jsx";
import StepContent from "./StepContent.jsx";
import StepNavigation from "./StepNavigation.jsx";
import ListItemDialogContainer from "../containers/ListItemDialogContainer.jsx";

const propTypes = {
    prevStep: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    setStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    steps: PropTypes.number.isRequired,
    create: PropTypes.func.isRequired,
    addSparring: PropTypes.func.isRequired,
    addTournament: PropTypes.func.isRequired,
    model: PropTypes.object,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    edit: PropTypes.bool.isRequired
};

/* eslint-disable react/prop-types */
const withLoader = Component => ({ loading, ...rest }) => (loading ? <Spinner className="create-event__loader" /> : <Component {...rest} />);

const enhance = compose(
    pure,
    withLoader
);

const CreateEventForm = ({ prevStep, nextStep, setStep, step, steps, create, addSparring, addTournament, model, type, close, edit, ...rest }) => (
    <div className="create-event__content mdl-shadow--2dp">
        <StepHeader
            setStep={setStep}
            step={step}
        />
        <StepContent
            step={step}
            addSparring={addSparring}
            addTournament={addTournament}
            {...rest}
        />
        <StepNavigation
            prevStep={prevStep}
            nextStep={nextStep}
            step={step}
            steps={steps}
            create={create}
            addSparring={addSparring}
            addTournament={addTournament}
            edit={edit}
        />
        <ListItemDialogContainer
            model={model}
            type={type}
            close={close}
        />
    </div>
);

CreateEventForm.propTypes = propTypes;

export default enhance(CreateEventForm);
