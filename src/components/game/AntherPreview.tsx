function AntherPreview({ text }: { text: string[] }) {
	return <div>{text.join(" , ")}</div>;
}

export default AntherPreview;
