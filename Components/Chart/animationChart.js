import React, { Component } from "react";
import { Text, View } from "react-native";

import { LineChart } from "react-native-svg-charts";

import { BPM, TextView } from "./Styles/Component";

export default class animationChart extends Component {
	constructor(props) {
		super(props);
		this.state = { chart: null, bpm: null };

		// rpeakCount result bolo arr limite => props

		var timer = setInterval((_) => {
			if (this.props.bolo >= this.props.limite) {
				this.props.arr = this.props.arr.slice(5, this.props.arr.length - 1);
				this.props.limite += 10;
			}

			if (this.props.bolo >= this.props.result.data.res.filtered.length) {
				clearInterval(timer);
			}

			this.props.arr.push(this.props.result.data.res.filtered[bolo++]);

			if (this.props.bolo >= this.props.result.data.res.rpeaks[rpeakCount]) {
				let bpm = (
					<BPM>
						<TextView>
							BPM <br />
							{parseInt(
								this.props.result.data.res.bpm[this.props.rpeakCount - 1]
							)}
						</TextView>
					</BPM>
				);
				this.props.rpeakCount++;

				this.setState({ bpm });
			}

			let chart = (
				<View
					style={{
						width: 600,
					}}
				>
					<LineChart
						style={{ height: 500, width: 600 }}
						data={this.props.arr}
						svg={{ stroke: "rgb(0, 255, 0)" }}
						contentInset={{ top: 20, bottom: 20 }}
						animate={false}
					></LineChart>
				</View>
			);

			this.setState({ chart });
		}, 1000 / 1000);
	}

	render() {
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		);
	}
}
