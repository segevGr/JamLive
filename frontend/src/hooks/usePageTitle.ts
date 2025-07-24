import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - JamLive`;
  }, [title]);
};

export default usePageTitle;
