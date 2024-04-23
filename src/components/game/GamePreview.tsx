import { css, keyframes } from "@emotion/react";
import { EnemyType, StateType } from "../../types";
import { useEffect, useState } from "react";

const gamePreview = css`
	width: 100%;
	height: 60%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const fadeInOut = keyframes`
	0% { opacity: 0; }
	50% { opacity: 1; }
	100% { opacity: 0; }
`;
const testAttack = (shake: boolean) => css`
	opacity: ${shake ? 1 : 0};
	font-size: 3rem;
	animation: ${shake ? css`animation: ${fadeInOut} 1s;` : 'none'};
`;

type GamePreviewPropsType = {
	attack: boolean;
	completeAttack: StateType<boolean>;
	gameOver: StateType<boolean>;
}

function GamePreview(props: GamePreviewPropsType) {
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const [enemyList, setEnemyList] = useState<EnemyType[]>([]);
	useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1)
    }, 1000);
    return () => clearInterval(interval);
	}, [elapsedTime]);
	useEffect(() => {
		console.log('attack');
		setTimeout(() => {
			if (props.attack) {
				props.completeAttack(false);
			}
		}, 1000)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.attack])
	const createEnemy = () => {
		const enemyType = Math.floor(Math.random() * 2);
		const getEnemyHP = (type: number) => {
			switch (type) {
				case 0:
					return 1;
				case 1:
					return 2;
				default:
					return 1;
			}
		}
		const enemy = {
			type: enemyType,
			hp: getEnemyHP(enemyType),
			create_at: elapsedTime
		}
		setEnemyList(prevEnemyList => [...prevEnemyList, enemy]);
	}
	useEffect(() => {
		const enemyCreationInterval = setInterval(() => {
			createEnemy();
			console.log(elapsedTime)
			console.log(enemyList);
		}, 4000);
		return () => clearInterval(enemyCreationInterval);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div css={gamePreview}>
			<div css={testAttack(props.attack)}>Attack!</div>
		</div>
	);
}

export default GamePreview;
