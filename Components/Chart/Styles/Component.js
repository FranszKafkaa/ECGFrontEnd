import styled, { css } from "styled-components/native";
import { Platform } from "react-native";

const Frag = styled.View`
	display: flex;
	flex-direction: row;

	${Platform.select({
		ios: css`
			flex-direction: column;
		`,
		android: css`
			flex-direction: column;
		`,
		web: css`
			flex-direction: row;
		`,
	})};

	justify-content: space-between;
`;

const BPM = styled.View`
	align-items: center;
	justify-content: center;
	width: 50%;
`;

const TextView = styled.Text`
	font-size: ${Number.parseInt(70)}px;
`;

export { Frag, BPM, TextView };
