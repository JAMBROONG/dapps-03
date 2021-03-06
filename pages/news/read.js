import Head from 'next/head'
import { useRouter } from 'next/router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Header from '../../component/newsComponent/header';

Read.getInitialProps = async () => {
  let dataa = [];
  let i = 1
  while (dataa.length <= 7) {
    const getNews = await fetch('https://api.coinmarketcap.com/content/v3/news?page=' + i + '&size=20');
    const newsData = await getNews.json();
    newsData.data.map((item) => {
      if (item.meta.content && dataa.length <= 7) {
        i++;
        dataa.push(item);
      }
    })
  }
  const getMarketCap = await fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=4ca92603-8ef6-4084-86a6-d1c55a430846').catch((err) => {
		if (err) {
			window.location.reload()
		}
	});
	const marketCap = await getMarketCap.json();
  return { moreNews: dataa, marketCapData: marketCap };
}

export default function Read({ moreNews, marketCapData }) {
  const [data, setData] = useState(false);
  const [more, setMore] = useState(moreNews);
  const router = useRouter();

  useEffect(async () => {
    window.addEventListener('scroll', () => {
      const toTop = document.querySelector('.btn-scroll-to-top');
      if (window.pageYOffset > 100) {
        return toTop.classList.add('active');
      }
      return toTop.classList.remove('active');
    });
    window.removeEventListener('scroll', () => {
      const toTop = document.querySelector('.btn-scroll-to-top');
      if (window.pageYOffset > 100) {
        return toTop.classList.add('active');
      }
      return toTop.classList.remove('active');
    });
    if (!data) {
      const getNews = await fetch('https://api.coinmarketcap.com/content/v3/news/' + router.query.s);
      const newsData = await getNews.json();
      setData(newsData.data);
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cryptocurency News Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={marketCapData} />
      <div className='container read-container'>
        {
          data && (
            <>
              <h1 className='mb-3 read-title' >{data.meta.title}</h1>
              <span className="cmc-news-time"><b>{data.meta.sourceName}</b> ??? {moment(data.meta.releasedAt).fromNow()}</span>
              <hr style={{ marginTop: '35px', marginBottom: '5px' }} />
              <span className='text-center text-muted'>Published on {moment(data.meta.releasedAt).format('LLLL')} ??? Edited on {moment(data.meta.updatedAt).format('LLLL')}</span>
              <div className='mt-5 read-content' align='justify' dangerouslySetInnerHTML={{ __html: data.meta.content }} />
              <div className='text-center'>
                <a href={data.meta.sourceUrl} className='btn btn-primary mt-5'>Read full article at <b className='mr-5'>{data.meta.sourceName} </b>
                  <i className='bi bi-box-arrow-up-right'></i></a>
              </div>
            </>
          )
        }
      </div>
      <div className='container mb-1'>
        <hr className='mt-5' />
        <div className='row justify-content-center align-item-center'>
          <h2 className='mt-2 mb-5' style={{ fontWeight: 'bold' }}>More News : </h2>
          {
            more.map((item, index) => {
              return (
                <div className='col-md-3 mb-3' key={index}>
                  <div className="card">
                    <img src={item.cover ? item.cover : '../../img/ph' + (Math.floor(Math.random() * 10) + 1) + '.jpg'} className="card-img-top" alt="..." style={{ objectFit: 'cover', width: '100%', height: '155px' }} />
                    <div className="card-body">
                      <p className="news-more-title">
                        <a href={'/news/read?s='+item.slug}>{item.meta.title}</a>
                      </p>
                    </div>
                    <div className='card-footer'>
                      <small className="cmc-news-time"><b>{item.meta.sourceName}</b> ??? {moment(item.meta.releasedAt).fromNow()}</small>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='row justify-content-center align-item-center'>
            <div className='col-md-3 text-center'>
              <a href='/news' className='btn btn-primary mb-5'>All News</a>
            </div>
          </div>
      </div>
    </>
  )
}
