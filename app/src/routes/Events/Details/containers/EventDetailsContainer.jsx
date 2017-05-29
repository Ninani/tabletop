import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EventDetails from "../components/EventDetails.jsx";
import { loadEvent } from "../../Index/modules/EventActions";

const propTypes = {
    id: PropTypes.number.isRequired,
    loadDetails: PropTypes.func.isRequired,
    tournaments: PropTypes.array,
    sparrings: PropTypes.array
};

const defaultProps = {
    tournaments: null,
    sparrings: null
};

const mapDispatchToProps = dispatch => ({
    loadDetails: id => loadEvent(id)(dispatch)
});

const mapStateToProps = ({ event }) => ({
    ...event
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

class EventDetailsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        const { loadDetails, id } = this.props;

        loadDetails(id);
    }

    componentWillReceiveProps({ tournaments, sparrings }) {
        if (this.props.tournaments !== tournaments || this.props.sparrings !== sparrings) {
            const _users = new Map();

            tournaments.forEach(({ users }) => {
                users.forEach(user => _users.set(user.id, user));
            });

            sparrings.forEach(({ users }) => {
                users.forEach(user => _users.set(user.id, user));
            });

            const users = Array.from(_users, ([, user]) => user);

            this.setState({
                users
            });
        }
    }

    render() {
        return (
            <EventDetails
                {...this.props}
                users={this.state.users}
            />
        );
    }
}

EventDetailsContainer.propTypes = propTypes;
EventDetailsContainer.defaultProps = defaultProps;

export default enhance(EventDetailsContainer);