import React, { Component } from "react";
import { Dimensions, View } from "react-native";

import axios from "axios";

import { LineChart } from "react-native-svg-charts";

import { G, Line } from "react-native-svg";

import { Frag, BPM, TextView } from "./Styles/Component";
import { ScrollView } from "react-native-gesture-handler";

export class ChartDOM extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);

		this.state = {
			Component: null,
			Another: null,
			bpm: null,
			paused: false,
			data: [],
		};

		this.tooglePauseAnimation = this.tooglePauseAnimation.bind(this);

		this.RenderBPM();
	}

	tooglePauseAnimation() {
		this.setState({ paused: !this.state.paused });
	}

	RenderBPM(bolo = 0, rpeakCount = 1, limite = 500, arr = []) {
		const { route } = this.props;
		let params = route.params;
		console.log(params);
		axios
			.get("https://ecgremote.herokuapp.com/render?id=" + params["id"])
			.then((result) => {
				for (
					var i = 0;
					i < result.data.res.filtered.length;
					i += result.data.res.rate / 5
				) {
					this.state.data.push(i);
				}

				var timer = setInterval((_) => {
					if (!this.state.paused) {
						if (bolo >= limite) {
							arr = arr.slice(40, arr.length - 1);
							limite += 40;
						}

						if (bolo >= result.data.res.filtered.length) {
							clearInterval(timer);
						}

						arr.push(result.data.res.filtered[bolo++]);

						if (bolo >= result.data.res.rpeaks[rpeakCount]) {
							let bpm = (
								<BPM>
									<TextView>
										BPM <br /> {parseInt(result.data.res.bpm[rpeakCount - 1])}
									</TextView>
								</BPM>
							);
							rpeakCount++;

							this.setState({ bpm });
						}

						let el = (
							<View
								style={{
									width: 600,
								}}
							>
								<LineChart
									style={{ height: 500, width: 600 }}
									data={arr}
									svg={{ stroke: "rgb(0, 255, 0)" }}
									contentInset={{ top: 20, bottom: 20 }}
									animate={false}
								></LineChart>
							</View>
						);

						this.setState({ Another: el });
					}
				});
				const CustomGrid = ({ x, y, _, ticks }) => (
					<G>
						{
							// Horizontal grid
							ticks.map((tick) => (
								<Line
									key={tick}
									x1={"0%"}
									x2={"100%"}
									y1={y(tick)}
									y2={y(tick)}
									stroke={"rgba(255,0,0)"}
								/>
							))
						}

						{
							// Vertical grid
							this.state.data.map((dado) => (
								<Line
									key={dado}
									y1={"0%"}
									y2={"100%"}
									x1={x(dado)}
									x2={x(dado)}
									stroke={"rgba(0,250,0)"}
								/>
							))
						}
					</G>
				);

				let ele = (
					<>
						<LineChart
							style={{ height: 210, width: Dimensions.get("window").width }}
							data={result.data.res.filtered}
							svg={{ stroke: "rgb(0, 0, 0)" }}
							contentInset={{ top: 20, bottom: 20 }}
						>
							<CustomGrid belowChart={true} />
						</LineChart>
					</>
				);

				this.setState({ Component: ele });
			});
	}

	render() {
		return (
			<ScrollView>
				<Frag onClick={this.tooglePauseAnimation}>
					{this.state.Another}

					{this.state.bpm}
				</Frag>

				{this.state.Component}
			</ScrollView>
		);
	}
}

export default ChartDOM;
