import { useAppDispatch, useAppSelector, setBrowseSong } from "store";
import { API, axiosInstance } from "services";
import type { Song } from "types";
import { useCallback } from "react";

const useBrowseSongManager = () => {
  const browseSong = useAppSelector((state) => state.songSession.browseSong);
  const dispatch = useAppDispatch();

  const handleSelectBrowseSong = useCallback(
    async (songId: string) => {
      const res = await axiosInstance.get<Song>(API.SONGS.GET_BY_ID(songId));
      dispatch(setBrowseSong(res.data));
    },
    [dispatch]
  );

  const handleCloseBrowseSong = useCallback(() => {
    dispatch(setBrowseSong(null));
  }, [dispatch]);

  return { browseSong, handleSelectBrowseSong, handleCloseBrowseSong };
};

export default useBrowseSongManager;
