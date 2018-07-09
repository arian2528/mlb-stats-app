import React, { Component } from 'react'; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveSelectedDates, fetchGraphStats } from "../actions/statsActions";

// Doc: https://github.com/skratchdot/react-bootstrap-daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

// Doc:https://www.npmjs.com/package/react-moment
import Moment from 'react-moment';
import 'moment-timezone';

// Doc: https://www.npmjs.com/package/react-icons
import * as FontAwesome from 'react-icons/lib/fa';

class DateRange extends Component {

    constructor(props){
        super(props);
    }

    saveSelectedDateRange = (event, picker) => {
        this.props.saveSelectedDates(picker)
        // Fetch graph data
        this.props.fetchGraphStats()
    }

    render() {
        return (
          <DateRangePicker startDate={this.props.startDateRangeDefault} endDate={this.props.endDateRangeDefault} onApply={(event, picker) => this.saveSelectedDateRange(event, picker)}>
            <button>
			    <FontAwesome.FaCalendar /><span className="dateRange"> <Moment format="MMM Do,YYYY" date={this.props.startDateRange} /> - <Moment format="MMM Do,YYYY" date={this.props.endDateRange} /></span> <b className="caret"></b>
            </button>
          </DateRangePicker>
        );
    }
}

DateRange.propTypes = {
    saveSelectedDates: PropTypes.func.isRequired,
    // startDateRange: PropTypes.string.isRequired,
    // endDateRange: PropTypes.string.isRequired,
    fetchGraphStats: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    startDateRange: state.stats.dateRangeStart,
    endDateRange: state.stats.dateRangeEnd,
    startDateRangeDefault: state.stats.dateRangeStartDefault,
    endDateRangeDefault: state.stats.dateRangeEndDefault,
});

export default connect(mapStateToProps, { saveSelectedDates, fetchGraphStats })(DateRange);