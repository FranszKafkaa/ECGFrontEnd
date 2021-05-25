import axios from "axios";
import React, { Component } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

export default class List extends Component {
	constructor(props) {
		super(props);

        this.state = {
            data: []
        }

        this.getData()
	}

    getData(){
        console.log("passo")
        axios.get("https://ecgremote.herokuapp.com/list_all").then(result => {
            const {data} = result

            var arr = []

            const {navigation} = this.props;


            data.forEach(element => {
                console.log(element)

                arr.push((
                    <>
                    <DataTable.Row>
                        <DataTable.Cell onPress={() => navigation.navigate("chart", {
                            id: element["_id"]
                        })}>{element["_id"]}</DataTable.Cell>
                        <DataTable.Cell onPress={() => navigation.navigate("chart", {
                            id: element["_id"]
                        })} >{element["datetime"]}</DataTable.Cell>
                    </DataTable.Row>
                </>
                ))
            });
            this.setState({data:arr})

        })
    }

	render() {

        

        
		return (
			<View>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>IDExame</DataTable.Title>
						<DataTable.Title numeric sortDirection="descending">
							Data
						</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
					</DataTable.Header>

                    {this.state.data}

					<DataTable.Pagination
						page={1}
						numberOfPages={3}
						onPageChange={(page) => {
							console.log(page);
						}}
						label="1-2 of 6"
					/>
				</DataTable>
			</View>
		);
	}
}
