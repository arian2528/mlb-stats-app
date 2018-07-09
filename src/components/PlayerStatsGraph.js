import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Bar, Line, Pie } from "react-chartjs-2";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



class PlayerStatsGraph extends Component {
	
	constructor(props){
		super(props);
	}
	
	render() {
		
	  	const options = {
			title: {
				text: 'Player performance'
			},
			xAxis: {
				categories: this.props.stats ? this.props.stats.map(day => day.Day) : []
			},
			labels: {
				items: [{
					html: 'Overall performance',
					style: {
						left: '50px',
						top: '18px',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
					}
				}]
			},
			series: [
				{
					type: 'column',
					name: 'At Bat',
					data: this.props.stats ? this.props.stats.map(day => day.AtBat) : [] 
				}, {
					type: 'column',
					name: 'Hits',
					data: this.props.stats ? this.props.stats.map(day => day.Hits) : []
				}, {
					type: 'column',
					name: 'Runs',
					data: this.props.stats ? this.props.stats.map(day => day.Runs) : []
				},

				// {
				// 	type: 'spline',
				// 	name: 'Average',
				// 	data: [3, 2.67, 3, 6.33, 3.33],
				// 	marker: {
				// 		lineWidth: 2,
				// 		lineColor: Highcharts.getOptions().colors[3],
				// 		fillColor: 'white'
				// 	}
				// },

				// {
				// 	type: 'pie',
				// 	name: 'Overall performance',
				// 	data: [{
				// 		name: 'Jane',
				// 		y: 13,
				// 		color: Highcharts.getOptions().colors[0] // Jane's color
				// 	}, {
				// 		name: 'John',
				// 		y: 23,
				// 		color: Highcharts.getOptions().colors[1] // John's color
				// 	}, {
				// 		name: 'Joe',
				// 		y: 19,
				// 		color: Highcharts.getOptions().colors[2] // Joe's color
				// 	}],
				// 	center: [100, 80],
				// 	size: 100,
				// 	showInLegend: false,
				// 	dataLabels: {
				// 		enabled: false
				// 	}
				// }
			]
		}

		return (
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
			/>
		);
	}
}

PlayerStatsGraph.propTypes = {
	// stats: PropTypes.array.isRequired,
	// daysDateRange: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	stats: state.stats.graphStats,
	daysDateRange: state.stats.daysDateRange,
});

export default connect(mapStateToProps, null)(PlayerStatsGraph);