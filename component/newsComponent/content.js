import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import moment from 'moment';
import filterNews from './filterNews';

export default function Content(props) {
	const [pageNumber, setPageNumber] = useState(0);
	const filter = props.value;
	const reset = props.reset;

	const { news, loading, hasMore, pageNow } = filterNews(filter, pageNumber, reset);

	const observer = useRef();
	const lastNewsElement = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setPageNumber(pageNow);
			}
		});
		if (node) observer.current.observe(node);
	}, [loading, hasMore]);

	return (
		<section className="cmc-px cmc-datanews">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8">
						{
							news.map((item, index) => {
								if (news.length === index + 1) {
									return (
										<div className="row cmc-news-one" ref={lastNewsElement} key={index}>
											<div className="col-md-7">
												<div className="cmc-news-title">
													<Link href={'/news/read?s=' + item.slug}>{item.meta.title}</Link>
												</div>
												<div className="cmc-news-desc mt-2">
													{item.meta.subtitle}
												</div>
												<div className="cmc-news-status mt-3">
													<span className="cmc-news-time"><b>{item.meta.sourceName}</b> • {moment(item.meta.releasedAt).fromNow()}</span>
												</div>
											</div>
											<div className="col-md-5 cmc-cover">
												<Link href={'/news/read?s=' + item.slug}>
													<a>
														<img className='img-fluid' alt={item.slug} src={item.cover ? item.cover : 'img/ph' + (Math.floor(Math.random() * 10) + 1) + '.jpg'} />
													</a>
												</Link>
											</div>
										</div>
									)
								} else {
									return (
										<div className="row cmc-news-one" key={index}>
											<div className="col-md-7">
												<div className="cmc-news-title">
													<Link href={'/news/read?s=' + item.slug}>{item.meta.title}</Link>
												</div>
												<div className="cmc-news-desc mt-2">
													{item.meta.subtitle}
												</div>
												<div className="cmc-news-status mt-3">
													<span className="cmc-news-time"><b>{item.meta.sourceName}</b> • {moment(item.meta.releasedAt).fromNow()}</span>
												</div>
											</div>
											<div className="col-md-5 cmc-cover">
												<Link href={'/news/read?s=' + item.slug}>
													<a>
														<img className='img-fluid' alt={item.slug} src={item.cover ? item.cover : 'img/ph' + (Math.floor(Math.random() * 10) + 1) + '.jpg'} />
													</a>
												</Link>
											</div>
										</div>
									)
								}
							})
						}
						{
							loading ? (
								<div className="row cmc-news-one">
									<div className="col-md-7">
										<p className="placeholder-glow">
											<span className="placeholder col-12 placeholder-lg mb-1"></span>
											<span className="placeholder col-6 placeholder-lg mb-3"></span>
											<span className="placeholder col-12 placeholder-sm"></span>
											<span className="placeholder col-10 placeholder-sm"></span>
											<span className="placeholder col-12 placeholder-sm"></span>
											<span className="placeholder col-11 placeholder-sm"></span>
											<span className="placeholder col-9 placeholder-sm mb-3 mt-1"></span>
											<span className="placeholder col-4 placeholder-sm"></span>
										</p>
									</div>
									<div className="col-md-5 cmc-cover">
										<p className="placeholder-glow">
											<span className='placeholder col-12 placeholder-img' />
										</p>
									</div>
								</div>
							) : (
								(<h4>You have seen all the content</h4>)
							)
						}
					</div>
				</div>
			</div>
		</section >
	)
}