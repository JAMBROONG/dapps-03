import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Header from '../../component/newsComponent/header';
import Dropdown from '../../component/newsComponent/dropdown';
import Content from '../../component/newsComponent/content';
import filterCoin from '../../component/newsComponent/filterCoin';

News.getInitialProps = async () => {
	const getCoins = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=4ca92603-8ef6-4084-86a6-d1c55a430846').catch((err) => {
		if (err) {
			window.location.reload()
		}
	});
	const coins = await getCoins.json();

	const getMarketCap = await fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=4ca92603-8ef6-4084-86a6-d1c55a430846').catch((err) => {
		if (err) {
			window.location.reload()
		}
	});
	const marketCap = await getMarketCap.json();

	return { coinsData: coins, marketCapData: marketCap };
}

export default function News({ coinsData, marketCapData }) {
	const [filter, setFilter] = useState(false);
	const [resetPage, setResetPage] = useState(false);
	const [dropdownSearch, setDropdownSearch] = useState('');

	const { listCoin } = filterCoin(dropdownSearch, coinsData);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setResetPage(false);
			const toTop = document.querySelector('.btn-scroll-to-top');
			if (window.pageYOffset > 100) {
				return toTop.classList.add('active');
			}
			return toTop.classList.remove('active');
		});
		window.removeEventListener('scroll', () => {
			setResetPage(false);
			const toTop = document.querySelector('.btn-scroll-to-top');
			if (window.pageYOffset > 100) {
				return toTop.classList.add('active');
			}
			return toTop.classList.remove('active');
		});
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Cryptocurency News Portal" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header data={marketCapData} />

			<section className="cmc-px my-5">
				<div className="container-fluid">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item cmc-link"><a href="https://cmc-gold.vercel.app/#">Headlines</a></li>
							<li className="breadcrumb-item cmc-link active" aria-current="page">News</li>
						</ol>
					</nav>
				</div>
			</section>

			<Dropdown value={filter ? filter : false} data={coinsData}>
				<div className='buton dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => {
					setDropdownSearch('');
				}}>
					{
						filter ? (
							<div>
								<img src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + filter.id + '.png'} className='me-2' />{filter.name}
							</div>) : (<>
								<div>All Coins</div>
								<i className='btn-clear bi bi-chevron-down'></i>
							</>
						)
					}
				</div>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<div className='search-input'>
						<input id='searchInput' autoComplete='off' onInput={(e) => { setDropdownSearch(e.target.value); }} value={dropdownSearch}
							className="cmc-searchinput2" type="search" placeholder="Search" aria-label="Search" />
					</div>
					<div className='dropdown-items'>
						{
							listCoin.length > 0 ? listCoin.map((item) => {
								return (
									<li className='dropdown-item' key={item.id} onClick={() => { setFilter(item); setResetPage(true) }}>
										<img src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + item.id + '.png'} className='me-2' /><small><b>{item.name}</b></small>
									</li>
								);
							}) : (<li className='dropdown-item'><small><b>No options!</b></small></li>)
						}
					</div>
				</ul>
				{
					filter ? (
						<i className='btn-clear bi bi-backspace-fill' onClick={() => {
							setDropdownSearch('');
							setFilter(false);
							setResetPage(true);
						}}></i>
					) : null
				}
			</Dropdown>

			<Content value={filter ? filter : false} reset={resetPage} />
			<Script src='js/jquery.js' />
			<Script src='js/popper.min.js' />
			<Script src='js/bootstrap.js' />
		</>
	)
}
