import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Script from "next/script";
export default function Header(props) {
	const [listCoin, setListCoin] = useState([]);
	const [ethGas, setEthGas] = useState([]);
	const [ethGasEstimate, setEthGasEstimate] = useState({});
	const [rendered, setRendered] = useState(false);
	const [data, setData] = useState({});
	const result = props.data;

	useEffect(async () => {
		setData({
			cryptos: result.data.total_cryptocurrencies,
			exchanges: result.data.active_exchanges,
			marketCap: result.data.quote.USD.total_market_cap,
			total24hVol: result.data.quote.USD.total_volume_24h,
			btcDominance: result.data.btc_dominance,
			ethDominance: result.data.eth_dominance,
		})
		console.log(result)
		const getCoins = await fetch('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=10&sortBy=market_cap&sortType=desc&convert=USD&cryptoType=all&tagType=all&audited=false');
		const coins = await getCoins.json();
		setListCoin(coins.data.cryptoCurrencyList);

		const getGasPrice = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=ZVZCBM5X5N5WW21ZIQWB242H28G1S1DNEF');
		const gasPrice = await getGasPrice.json();
		setEthGas(gasPrice.result);

		const getDataSlow = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=' + (ethGas.SafeGasPrice * 10 ** 9) + '&apikey=ZVZCBM5X5N5WW21ZIQWB242H28G1S1DNEF');
		const slow = await getDataSlow.json();
		const getDataStandard = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=' + (ethGas.ProposeGasPrice * 10 ** 9) + '&apikey=ZVZCBM5X5N5WW21ZIQWB242H28G1S1DNEF');
		const standard = await getDataStandard.json();
		const getDataFast = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=' + (ethGas.FastGasPrice * 10 ** 9) + '&apikey=ZVZCBM5X5N5WW21ZIQWB242H28G1S1DNEF');
		const fast = await getDataFast.json();

		setEthGasEstimate({
			slow: slow.result,
			standard: standard.result,
			fast: fast.result
		});

		setRendered(true);
	}, [rendered]);
	const formatUang = (angka) => {
		let number_string = angka.toString().replace(/[^.\d]/g, ""),
			split = number_string.split("."),
			sisa = split[0].length % 3,
			uang = split[0].substr(0, sisa),
			ribuan = split[0].substr(sisa).match(/\d{3}/gi);

		if (ribuan) {
			let separator = sisa ? "," : "";
			uang += separator + ribuan.join(",");
		}

		uang = split[1] != undefined ? uang + "," + split[1] : uang;
		return uang;
	}
	return (
		<>
			<button className='btn-scroll-to-top' onClick={() => {
				window.scrollTo(0, 0);
			}}><i className='bi bi-arrow-up-short' style={{ fontSize: "25px" }}></i></button>
			<section className="cmc-px nav-top">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<div className="cmc-currency d-flex">
							<span>Cryptos: <a href="#">{formatUang(parseInt(data.cryptos))}</a></span>
							<span>Exchanges: <a href="#">{formatUang(parseInt(data.exchanges))}</a></span>
							<span>Market Cap: <a href="#">${formatUang(parseInt(data.marketCap))}</a></span>
							<span>24h Vol: <a href="#">${formatUang(parseInt(data.total24hVol))}</a></span>
							<span>Dominance: <a href="#">BTC: {Number(data.btcDominance).toFixed(2)}% ETH: {Number(data.ethDominance).toFixed(2)}%</a></span>
							<span className="eth-gas">ETH Gas: <a href="#">{ethGas.ProposeGasPrice} Gwei</a>
								<ul className="eth-gas-dropdown">
									<li>
										<p>Slow</p>
										<p><b>{ethGas.SafeGasPrice} GWEI</b></p>
										<p>~{ethGasEstimate.slow} second</p>
									</li>
									<li>
										<p>Standard</p>
										<p><b>{ethGas.ProposeGasPrice} GWEI</b></p>
										<p>~{ethGasEstimate.standard} second</p>
									</li>
									<li>
										<p>Fast</p>
										<p><b>{ethGas.FastGasPrice} GWEI</b></p>
										<p>~{ethGasEstimate.fast} second</p>
									</li>
								</ul>
							</span>
						</div>
						<div className="cmc-setting">
							<span>English</span>
							<span>USD</span>
						</div>
					</div>
				</div>
			</section>
			<nav className="navbar navbar-expand-lg cmc-navbar cmc-px">
				<div className="container-fluid">
					<a className="navbar-brand cmc-logo" href="https://cmc-gold.vercel.app/#">DAPPS-03</a>
					<button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Cryptocurrencies</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Exchanges</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">NFT</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Portfolio</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Watchlist</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Calendars</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Products</a>
							</li>
							<li className="nav-item">
								<a className="nav-link cmc-link" href="https://cmc-gold.vercel.app/#">Learn</a>
							</li>
						</ul>
						<form className="d-flex">
							<button className="cmc-login">Log in</button>
							<button className="cmc-signup">Sign up</button>
							<input className="form-control cmc-searchinput" type="search" placeholder="Search" aria-label="Search" />
						</form>
					</div>
				</div>
			</nav>

			<section className="cmc-running-text">
				<Marquee speed={50} pauseOnHover={true} pauseOnClick={true} gradientWidth={50}>
					{
						listCoin.map((item) => {
							return (
								<span className="d-flex align-items-center marquee-item" key={item.id}>
									<img src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + item.id + '.png'} className='me-2' />
									<div className="d-flex flex-column cmc-crypto">
										<span className="cmc-name">{item.name}</span>
										<span className="cmc-alias">{item.symbol}</span>
									</div>
									<div className="cmc-total">{'$' + (item.quotes[0].price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
								</span>
							)
						})
					}
				</Marquee>
			</section>
			<Script src='../js/bootstrap.js' />
		</>
	)
}