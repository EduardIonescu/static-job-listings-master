function App() {
	const [data, setData] = React.useState(false);
	const [categories, setCategories] = React.useState(false);
	const [filterCategories, setFilterCategories] = React.useState([]);

	const addFilterCategory = (category) => {
		const nextFilterCategories = [...filterCategories];
		if (!nextFilterCategories.includes(category)) {
			nextFilterCategories.push(category);
			setFilterCategories(nextFilterCategories);
		}
	};

	const clearCategories = (clearCategory) => {
		// delete all categories if category is not specified
		if (!clearCategory) {
			setFilterCategories([]);
		} else {
			// delete filter category on X
			const nextFilterCategories = [...filterCategories].filter(
				(category) => category != clearCategory
			);
			setFilterCategories(nextFilterCategories);
		}
	};

	const filterTablets = () => {
		const filteredData = [...data].filter((d) => {
			return filterCategories.every((category) =>
				categories[d.id - 1].includes(category)
			);
		});
		return filteredData;
	};

	async function getData() {
		const url = "../data.json";

		await fetch(url)
			.then((res) => res.json())
			.then((actualData) => {
				setData(actualData);
				setCategories(
					actualData.map((listing) => {
						return [
							listing.role,
							listing.level,
							...listing.languages,
							...listing.tools,
						];
					})
				);
			});
	}

	React.useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{filterCategories.length >= 1 && (
				<FilterBar
					filterCategories={filterCategories}
					clearCategories={clearCategories}
				/>
			)}
			{data && categories && (
				<JobListing
					data={filterTablets()}
					categories={categories}
					addFilterCategory={addFilterCategory}
				/>
			)}
		</>
	);
}

function JobListing({ data, categories, addFilterCategory }) {
	return (
		<ul className="container-tablets">
			{data.map((d) => {
				return (
					<li key={d.id} className="tablet">
						{d.featured && (
							<div className="featured-background"></div>
						)}
						<img
							src={d.logo}
							alt=""
							aria-hidden="true"
							width={48}
							height={48}
						/>
						<section>
							<article className="container-left">
								<ul className="container-top">
									<li className="company-name">
										{d.company}
									</li>
									{d.new && <li className="new">NEW!</li>}
									{d.featured && (
										<li className="featured">FEATURED</li>
									)}
								</ul>
								<h2 className="title">{d.position}</h2>
								<div className="container-bottom">
									<p>{d.postedAt}</p>

									<p className="hasDot">{d.contract}</p>

									<p className="hasDot">{d.location}</p>
								</div>
							</article>
							<Buttons
								tabletCategories={categories[d.id - 1]}
								addFilterCategory={addFilterCategory}
							/>
						</section>
					</li>
				);
			})}
		</ul>
	);
}

function Buttons({ tabletCategories, addFilterCategory }) {
	return (
		<ul className="container-right">
			{tabletCategories.map((category, i) => {
				return (
					<li
						key={i}
						onClick={() => {
							addFilterCategory(category);
						}}
						className="category"
					>
						{category}
					</li>
				);
			})}
		</ul>
	);
}

function FilterBar({ filterCategories, clearCategories }) {
	return (
		<section className="filter-bar">
			<ul>
				{filterCategories.map((filterCategory, i) => {
					return (
						<FilterButton
							key={i}
							category={filterCategory}
							clearCategories={clearCategories}
						/>
					);
				})}
			</ul>
			<button className="button-clear" onClick={() => clearCategories()}>
				Clear
			</button>
		</section>
	);
}

function FilterButton({ category, clearCategories }) {
	return (
		<li className="category">
			{category}
			<button
				className="button-clear-category"
				onClick={() => {
					clearCategories(category);
				}}
			>
				<img src="../images/icon-remove.svg" alt="clear category" />
			</button>
		</li>
	);
}

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
root.render(<App />);
