import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {

	renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp).map(convertKtoF);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return(
			<tr key={name}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td><Chart data={temps} color="orange" units="F"/> </td>
				<td><Chart data={pressures} color="blue" units="hPa"/> </td>
				<td><Chart data={humidities} color="green" units="%"/></td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th> City </th>
						<th> Temperature (F)</th>
						<th> Pressure (hPa)</th>
						<th> Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

function 	convertKtoF(temp) {
		return (9/5 * (temp-273) + 32);
	}

function mapStateToProps({weather}) { 
	return { weather }; // { weather } === { weather: weather }
}
export default connect(mapStateToProps)(WeatherList);