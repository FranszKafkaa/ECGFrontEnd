import React, { Component } from "react";
import { Text, View } from "react-native";

import axios from "axios";

import { LineChart, Grid } from "react-native-svg-charts";

export class ChartDOM extends Component {
	constructor(props) {
		super(props);

		this.state = { Component: null, Another: null };

		
		axios.post("https://ecgremoto.herokuapp.com/demo").then((result) => {
			
			var limite = 600

			var arr = result.data.res.filtered.slice(0, 200);

			var bolo = arr.length;
			var timer = setInterval((_) => {
			
				if(bolo >= limite){
					
					arr = arr.slice(50, arr.length -1 )
					limite += 100
				}
				
				if(bolo >= result.data.res.filtered.length){
					clearInterval(timer)
				}

				arr.push(result.data.res.filtered[bolo++])
				
				
				let el = (
					<div>
						<LineChart
							style={{ height: 500, width: 600 }}
							data={arr}
							svg={{ stroke: "rgb(255, 0, 0)" }}
							contentInset={{ top: 20, bottom: 20 }}
						>
							
						</LineChart>
					</div>
				);

				

				this.setState({ Another: el });

				
			}, 3);


			let ele = (
				<LineChart
					style={{ height: 500 }}
					data={result.data.res.filtered}
					svg={{ stroke: "rgb(0, 0, 0)" }}
					contentInset={{ top: 20, bottom: 20 }}
				>
					<Grid />
				</LineChart>
			);

			this.setState({ Component: ele });
		});
	}

	format_data(data = []) {}

	render() {
		return (
			<View>
				<Text>SAAS</Text>
				{this.state.Another}
				{this.state.Component}
			</View>
		);
	}
}

export default ChartDOM;
