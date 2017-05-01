import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import { CardActions } from "react-mdl/lib/Card";
import Button from "react-mdl/lib/Button";

const propTypes = {
    actions: PropTypes.array.isRequired
};

const enhance = pure;

const CardFormActions = ({ actions }) => (
    <CardActions className="card-form__actions">
        {actions.map(({ label, ...rest }) => (
            <Button key={label} {...rest}>{label}</Button>
        ))}
    </CardActions>
);

CardFormActions.propTypes = propTypes;

export default enhance(CardFormActions);
