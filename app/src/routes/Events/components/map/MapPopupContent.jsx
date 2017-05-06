import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import moment from "moment";

const propTypes = {
    location: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired
};

const enhance = pure;

const getFormats = (from, to) => {
    if (from.year() === to.year()) {
        if (from.month() === to.month()) {
            if (from.day() === to.day()) {
                return ["Do MMM YYYY"];
            }

            return ["Do MMM", "Do MMM YYYY"];
        }

        return ["Do MMM", "Do MMM YYYY"];
    }

    return ["Do MMM YYYY", "Do MMM YYYY"];
};

const getDate = (startDate, endDate) => {
    const fromDate = moment(startDate);
    const toDate = moment(endDate);

    const [fromFormat, toFormat = null] = getFormats(fromDate, toDate);

    if (toFormat) {
        const from = fromDate.format(fromFormat);
        const to = toDate.format(toFormat);
        return `${from} –  ${to}`;
    }

    return fromDate.format(fromFormat);
};

const MapPopupContent = ({ location, name, startDate, endDate }) => (
    <div className="events-map-popup">
        <h3 className="events-map-popup__name">{name}</h3>
        <p className="events-map-popup__location">{location.address ? `${location.name} – ${location.address}` : location.name}</p>
        <p className="events-map-popup__date">{getDate(startDate, endDate)}</p>
    </div>
);

MapPopupContent.propTypes = propTypes;

export default enhance(MapPopupContent);
