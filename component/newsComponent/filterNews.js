import { useEffect, useState } from 'react';

export default function filterNews(coin, pageNumber, reset) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [pageNow, setPageNow] = useState(false);

    const fetchData = async (coin, pageNumber, reset) => {
        let result = [];
        let i = reset ? 0 : pageNumber;

        while (result.length <= 9) {
            i++;
            const query = coin ? 'coins=' + coin.id + '&page=' + i + '&size=9' : 'page=' + i + '&size=9';
            const url = 'https://api.coinmarketcap.com/content/v3/news?' + query;
            const getNews = await fetch(url);
            const newsData = await getNews.json();
            if (i > 20) return result;
            newsData.data.map((item) => {
                if (item.meta.content && result.length <= 9) {
                    if (!item.cover) {
                        item.cover = 'img/ph' + (Math.floor(Math.random() * 10) + 1) + '.jpg'
                    }
                    result.push(item);
                }
            });
        }
        setPageNow(i);
        return result
    }
    useEffect(() => {
        setNews([]);
    }, [coin]);
    useEffect(() => {
        setLoading(true);
        fetchData(coin, pageNumber, reset).then(res => {
            setNews(prevNews => {
                return [...new Set([...prevNews, ...res.map(item => item)])]
            });
            setHasMore(res.length > 0);
            setLoading(false);
        })
    }, [coin, pageNumber]);

    return {
        news, loading, hasMore, pageNow
    }
}