function Header() {
	const [width, setWidth] = React.useState(window.innerWidth);
	React.useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, []);
	return (
		<img
			src={
				width >= 850
					? "../images/bg-header-desktop.svg"
					: "../images/bg-header-mobile.svg"
			}
			className="image-bg"
			alt=""
			aria-hidden="true"
		/>
	);
}

const domNode = document.querySelector("header");
const root = ReactDOM.createRoot(domNode);
root.render(<Header />);
