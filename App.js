import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, SafeAreaView } from "react-native";

import Header from "./Components/Head/Header";
import ChartDOM from "./Components/Chart/chart";

import GlobalStyle from "./Theme/globalStyle";

//teste pull request...

export default function App() {
	return (
		<GlobalStyle>
			<SafeAreaView style={{ flex: 1 }}>
				<Header />
				<Text>Open up App.js to start working on your app!</Text>

				<ChartDOM />

				<StatusBar style="dark" />
			</SafeAreaView>
		</GlobalStyle>
	);
}
