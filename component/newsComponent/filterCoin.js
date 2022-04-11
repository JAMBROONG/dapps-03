import { useEffect, useState } from "react";

export default function filterCoin(query, data) {
	const [listCoin, setCoinsList] = useState([]);
	useEffect(async () => {
		if (query.length > 2) {
			const coins = await data.data.filter((coin) => {
				let coinName = coin.name.toLowerCase();
				return coinName.includes(query.toLowerCase());
			});
			await coins.sort((a, b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0));
			setCoinsList(coins);
		} else {
			const coins = await data.data.filter((coin) => {
				return coin.rank < 8;
			});
			await coins.sort((a, b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0));
			setCoinsList(coins);
		}
	}, [query]);

	return {
		listCoin
	}
}