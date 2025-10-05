import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

type ISocketContext = {
  socket: Socket | null;
};

const SocketContext = createContext<ISocketContext>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Connected to socket:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
