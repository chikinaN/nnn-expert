import { StateType } from "../types";
import { css } from '@emotion/react';

const titleStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}
	h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	p {
		font-size: 1rem;
		text-align: center;
	}
	button {
		font-size: 1.5rem;
		padding: 0.5rem 1rem;
		border: none;
		background-color: #000;
		color: #FFFFFF;
		cursor: pointer;
		&:hover {
			background-color: #222;
		}
	}
`
const whisper = css`
	font-size: 0.8rem;
`

function Title({ change }: { change: StateType<number>}) {
	const start = () => {
		change(1);
	}
	return (
		<section css={titleStyle}>
			<h1>タイピングっぽいゲーム</h1>
			<h3>エキスパート教材用のやつ</h3>
			<p>
				<b>ゲーム説明</b><br />
				アルファベットの呪文を入力して敵を倒そう！<br />
				<b>操作説明</b><br />
				左上にアルファベットが表示されるので、<br />
				その順番通りに入力してEnterキーを押してください。<br />
				大文字なのでCapsLockを使うのを推奨してます。<br />
				難易度を上げたければ、Shiftキーを使ってください。<br />
				<span css={whisper}>きちんとform使ってますよ!</span>
			</p>
			<button onClick={start}>Start</button>
		</section>
	)
}

export default Title;
