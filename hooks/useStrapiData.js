import { useState, useEffect, useCallback } from "react";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const createStrapiURL = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${STRAPI_BASE_URL}${path}`;
};

export function useStrapiData(endpointPath, autoFetch = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpointPath) {
      setData(null);
      return;
    }

    setError(null);
    try {
      const response = await fetch(new Request(createStrapiURL(endpointPath)));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      console.error(`Error fetching from ${endpointPath}:`, e);
      setError(e);
      setData(null);
    }
  }, [endpointPath]);

  useEffect(() => {
    if (autoFetch && endpointPath) {
      fetchData();
    }
  }, [fetchData, autoFetch, endpointPath]);

  return { data, error, fetchData };
}
