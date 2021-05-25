import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

import ChartDOM from "./Components/Chart/chart";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./Components/list/list";

import GlobalStyle from "./Theme/globalStyle";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<GlobalStyle>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack.Navigator>
						<Stack.Screen
							name="bolo"
							component={List}
							options={{ title: "Ecg Remoto" }}
						/>
						<Stack.Screen name="chart" component={ChartDOM} />
					</Stack.Navigator>

					<StatusBar style="dark" />
				</SafeAreaView>
			</GlobalStyle>
		</NavigationContainer>
	);
}
