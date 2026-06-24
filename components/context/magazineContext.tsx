'use client';

import { useMagazines } from '@/hooks/useStrapi';
import type { Magazine } from '@/types/strapi';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

interface MagazineContextValue {
  latestIssue: Magazine | null;
  allMagazines: Magazine[];
  magazinesError: Error | null;
  refetchMagazines: () => void;
}

const MagazineDataContext = createContext<MagazineContextValue>({
  latestIssue: null,
  allMagazines: [],
  magazinesError: null,
  refetchMagazines: () => {},
});

export const useMagazineData = () => useContext(MagazineDataContext);

export const MagazineDataProvider = ({ children }: { children: ReactNode }) => {
  const { data: magazineApiData, error, refetch } = useMagazines();

  const { latestIssue, allMagazines } = useMemo(() => {
    const magazines = magazineApiData?.data ?? [];
    if (magazines.length === 0) return { latestIssue: null, allMagazines: [] };

    const sorted = [...magazines].sort((a, b) => {
      const getNum = (item: Magazine) => {
        const match = item?.issue_number?.match(/issue-(\d+)/i);
        return match?.[1] ? parseInt(match[1], 10) : -Infinity;
      };
      return getNum(b) - getNum(a);
    });

    return { latestIssue: sorted[0] ?? null, allMagazines: magazines };
  }, [magazineApiData]);

  return (
    <MagazineDataContext.Provider
      value={{
        latestIssue,
        allMagazines,
        magazinesError: error,
        refetchMagazines: refetch,
      }}
    >
      {children}
    </MagazineDataContext.Provider>
  );
};
