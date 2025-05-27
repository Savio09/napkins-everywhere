"use client";
import { useStrapiData } from "@/hooks/useStrapiData";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const SESSION_STORAGE_KEY_LATEST_ISSUE = "napkinsCtxActiveLatestIssue";
const SESSION_STORAGE_KEY_ALL_MAGAZINES = "napkinsCtxActiveAllMagazines";

const MagazineDataContext = createContext({
  latestIssue: null,
  allMagazines: [],
  magazinesError: null,
  setLatestIssueManually: (issue) => {},
  setAllMagazinesManually: (magazines) => {},
  refetchMagazines: async () => {},
});

export const useMagazineData = () => {
  return useContext(MagazineDataContext);
};

export const MagazineDataProvider = ({ children }) => {
  const [latestIssueState, setLatestIssueState] = useState(null);
  const [allMagazinesState, setAllMagazinesState] = useState([]);
  const [initialStorageLoadComplete, setInitialStorageLoadComplete] =
    useState(false);

  const {
    data: magazineApiData,
    error: apiHasError,
    fetchData: triggerApiFetch,
  } = useStrapiData("/api/magazines?populate=*", false);

  //Let's load it first from local storage.

  useEffect(() => {
    try {
      const storedLatest = localStorage.getItem(
        SESSION_STORAGE_KEY_LATEST_ISSUE
      );
      if (storedLatest) {
        setLatestIssueState(JSON.parse(storedLatest));
      }
      const storedAll = localStorage.getItem(SESSION_STORAGE_KEY_ALL_MAGAZINES);
      if (storedAll) {
        setAllMagazinesState(JSON.parse(storedAll));
      }
    } catch (error) {
      console.error("Context: Error reading from local storage", error);
    }
    setInitialStorageLoadComplete(true);
  }, []);

  //Try to fetch it from the API and then set session storage.

  useEffect(() => {
    if (initialStorageLoadComplete) {
      if (
        (!latestIssueState || allMagazinesState.length === 0) &&
        !apiHasError
      ) {
        console.log(
          "Context: Data not in localStorage or empty. Triggering API fetch."
        );
        triggerApiFetch();
      }
    }
  }, [
    initialStorageLoadComplete,
    allMagazinesState,
    apiHasError,
    triggerApiFetch,
    latestIssueState,
  ]);

  // Process the data from the API when it comes

  useEffect(() => {
    if (magazineApiData && magazineApiData.data) {
      console.log("Got some fresh info from the db");
      const magazines = magazineApiData.data;
      let newLatestIssue = null,
        newAllMagazines = [];

      if (magazines.length > 0) {
        newAllMagazines = [...magazines];
        const sorted = [...magazines].sort((a, b) => {
          const getIssueNumber = (item) => {
            const issueNumber = item?.issue_number;
            if (typeof issueNumber !== "string") return -Infinity;
            const match = issueNumber.match(/issue-(\d+)/i);
            return match && match[1] ? parseInt(match[1], 10) : -Infinity;
          };
          return getIssueNumber(b) - getIssueNumber(a);
        });
        if (sorted.length > 0) newLatestIssue = sorted[0];
      }

      setLatestIssueState(newLatestIssue);
      setAllMagazinesState(newAllMagazines);

      // After fetching, placing it in session storage to persist data. We're complementing the UseContext API with session storage
      try {
        if (newLatestIssue) {
          sessionStorage.setItem(
            SESSION_STORAGE_KEY_LATEST_ISSUE,
            JSON.stringify(newLatestIssue)
          );
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY_LATEST_ISSUE);
        }
        // If there's a latest issue then there is definitely all the magazines
        sessionStorage.setItem(
          SESSION_STORAGE_KEY_ALL_MAGAZINES,
          JSON.stringify(newAllMagazines)
        );
        console.log("Uploaded data to session storage");
      } catch (error) {
        console.log(error);
      }
    }
  }, [magazineApiData]);

  const setLatestIssueManually = useCallback((issue) => {
    setLatestIssueState(issue);
    try {
      if (issue)
        sessionStorage.setItem(
          SESSION_STORAGE_KEY_LATEST_ISSUE,
          JSON.stringify(issue)
        );
      else localStorage.removeItem(SESSION_STORAGE_KEY_LATEST_ISSUE);
      console.log("Latest issue set manually");
    } catch (error) {
      console.error("Failed to save latest issue to session storage");
    }
  }, []);

  const setAllMagazinesManually = useCallback((magazines) => {
    const mags = Array.isArray(magazines) ? magazines : [];
    setAllMagazinesState(mags);
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ALL_MAGAZINES,
        JSON.stringify(mags)
      );
      console.log("Context: All magazines set manually.");
    } catch (error) {
      console.error(
        "Context: Error manual-saving allMagazines to localStorage:",
        error
      );
    }
  }, []);

  const value = {
    latestIssue: latestIssueState,
    allMagazines: allMagazinesState,
    magazinesError: apiHasError,
    setLatestIssueManually,
    setAllMagazinesManually,
    refetchMagazines: triggerApiFetch,
  };

  return (
    <MagazineDataContext.Provider value={value}>
      {children}
    </MagazineDataContext.Provider>
  );
};
