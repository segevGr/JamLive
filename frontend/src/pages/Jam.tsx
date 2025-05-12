import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../constants/api";
import { axiosInstance } from "../constants/axios";
import SongDisplay from "../components/SongDisplay";
import { useAppSelector } from "../store/storeHooks";
import InstrumentBadge from "../components/InstrumentBadge";
import AutoScrollToggle from "../components/AutoScrollToggle";
import QuitButton from "../components/QuitButton";

type SongLine = { lyrics: string; chords?: string };

interface SongData {
  id: string;
  title: string;
  artist: string;
  image: string;
  lyrics: SongLine[][];
}

export default function Jam() {
  const { songId } = useParams();
  const { role, instrument } = useAppSelector((state) => state.auth);

  const [song, setSong] = useState<SongData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (autoScroll) {
      scrollInterval.current = setInterval(() => {
        const container = scrollRef.current!;
        container.scrollBy({ top: 1, behavior: "smooth" });

        const { scrollTop, scrollHeight, clientHeight } = container;
        const reachedBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (reachedBottom) {
          setAutoScroll(false);
        }
      }, 150);
    }

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };
  }, [autoScroll]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        if (!songId) throw new Error("Missing song ID in URL");
        const res = await axiosInstance.get(API.SONGS.GET_BY_ID(songId));
        setSong(res.data);
      } catch (err) {
        setError("Failed to load song.");
        console.error(err);
      }
    };

    fetchSong();
  }, [songId]);

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto bg-background relative pb-20"
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-primaryLight mb-6">
          Live Session
        </h1>
        {error && <p className="text-errorText">{error}</p>}
        {!song && !error && <p className="text-lg">Loading song...</p>}
        {song && (
          <>
            <div className="bg-white rounded-xl shadow-md px-40 py-8 mx-auto text-center">
              <h2 className="text-5xl font-bold text-gold mb-2">
                {song.title}
              </h2>
              <p className="text-xl text-primaryLight mb-4 mt-1">
                {song.artist}
              </p>
              <InstrumentBadge instrument={instrument!} />
              <SongDisplay
                song={song.lyrics}
                isSinger={instrument?.toLowerCase() === "vocals"}
              />
            </div>
          </>
        )}
      </div>
      <AutoScrollToggle
        isScrolling={autoScroll}
        toggle={() => setAutoScroll(!autoScroll)}
      />
      {role === "admin" && <QuitButton onQuit={() => {}} />}
    </div>
  );
}
