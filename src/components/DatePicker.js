import React, { Component } from 'react'; 

// Doc: https://github.com/Adphorus/react-date-range
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file


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
import * as FontAwesome from 'react-icons/lib/fa'

// class DatePicker extends Component {
// 	handleSelect(ranges){
// 		console.log(ranges);
// 		// {
// 		// 	selection: {
// 		// 		startDate: [native Date Object],
// 		// 		endDate: [native Date Object],
// 		// 	}
// 		// }
// 	}
// 	render(){
// 		const selectionRange = {
// 			startDate: new Date(),
// 			endDate: new Date(),
// 			key: 'selection',
// 		}
// 		return (
// 			<DateRangePicker
// 				ranges={[selectionRange]}
// 				onChange={this.handleSelect}
// 			/>
// 		)
// 	}
// }
// export default DatePicker;

class DatePicker extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            
            startDateDefault: new Date(),
            endDateDefault: new Date(),
            startDateMoment: this.props.startDate,
            endDateMoment: this.props.endDate,
			
        };    
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ startDateMoment: nextProps.startDate, endDateMoment: nextProps.endDate });  
    }

    // handleEvent(event, picker) {
    //     console.log(picker.startDate);
    //     console.log(picker.endDate);
    //     // this.setState({ startDate: picker.startDate, endDate: picker.endDate })
    // }

    render() {
        return (
          <DateRangePicker startDate={this.state.startDateDefault} endDate={this.state.endDateDefault} onApply={this.props.dateRange}>
            <button>
			    <FontAwesome.FaCalendar /><span className="dateRange"> <Moment format="MMM Do,YYYY" date={this.state.startDateMoment} /> - <Moment format="MMM Do,YYYY" date={this.state.endDateMoment} /></span> <b className="caret"></b>
            </button>
          </DateRangePicker>
        );
      }
}
export default DatePicker;