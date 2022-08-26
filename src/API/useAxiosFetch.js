import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from './axiosBase';

function useAxiosFetch(category, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feedLoadouts, setFeedLoadouts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axiosInstance.get(`/feed/${category}/${page}`)
      if (res.data.length < 1) { 
        console.log('shrot', res.data);
        setHasMore(false) 
      };
      await setFeedLoadouts((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [category, page]);

  useEffect(() => {
    sendQuery(category);
  }, [category, sendQuery, page]);

  return { loading, error, feedLoadouts, hasMore };
}

export default useAxiosFetch;