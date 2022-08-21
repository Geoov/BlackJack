import React from "react";
import socketIOClient from "socket.io-client";
import { API_URL } from "../config/config";

export const socket = socketIOClient.connect(API_URL, { reconnection: false });
export const SocketContext = React.createContext();
