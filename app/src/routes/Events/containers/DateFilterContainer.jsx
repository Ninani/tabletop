import React from "react";
import pure from "recompose/pure";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { setFilterActive, setFilterDateRange } from "../modules/FilterActions";
import getCurrentDate from "../modules/FilterUtils";
import DateFilter from "../components/filters/DateFilter.jsx";

const mapStateToProps = ({ dateFilter }) => dateFilter;
const mapDispatchToProps = dispatch => ({
    setFrom: ev => dispatch(setFilterDateRange(ev.target.value, null)),
    setTo: ev => dispatch(setFilterDateRange(null, ev.target.value)),
    setPastDate: () => dispatch(setFilterDateRange(undefined, getCurrentDate())),
    setFutureDate: () => dispatch(setFilterDateRange(getCurrentDate(), undefined)),
    setActive: ev => dispatch(setFilterActive("date", ev.target.checked))
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    pure
);

const DateFilterContainer = props => (
    <DateFilter {...props} />
);

export default enhance(DateFilterContainer);
