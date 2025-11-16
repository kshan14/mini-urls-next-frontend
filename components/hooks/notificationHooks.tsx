"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { UrlStatus } from "@/lib/apis/miniurls/types";

interface NotificationWSData {
  id: string;
  url: string;
  shortenedUrl: string;
  status: UrlStatus;
  creatorId: string;
}

interface NotiDropdownData {
  id: string;
  url: string;
  shortenedUrl: string;
  message: string;
  redirectUrl: string;
}

const MAX_NOTI_DATA = 5;
const RECONNECT_INTERVAL = 5000; // try to reconnect every 5 sec

function TransformToNotiDropdownData(
  wsNotiData: NotificationWSData
): NotiDropdownData {
  const { id, url, shortenedUrl, status } = wsNotiData;
  const message =
    wsNotiData.status === "Pending"
      ? `${shortenedUrl} has been added`
      : `${shortenedUrl} has been ${status.toLowerCase()}`;
  const urlFilterParams = new URLSearchParams({
    status: wsNotiData.status,
  });
  return {
    id,
    url,
    shortenedUrl,
    message,
    redirectUrl: `/urls?${urlFilterParams.toString()}`,
  };
}

export function useNotificationHooks(wsUrl: string, jwtToken: string) {
  // data related to other action on notification button
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasReadAll, setHasReadAll] = useState(true);
  // data related to websocket
  const [notiData, setNotiData] = useState<NotiDropdownData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const wsReconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    const urlParams = new URLSearchParams({
      token: jwtToken,
    });
    const ws = new WebSocket(`${wsUrl}?${urlParams.toString()}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`ws connection connected`);
    };
    // when ws is closed, try to reconnect every X sec
    ws.onclose = () => {
      console.log(`ws connection disconnected`);
      wsReconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, RECONNECT_INTERVAL);
    };
    // on error, just close
    ws.onerror = (event) => {
      console.error(`ws error readyState: ${wsRef.current?.readyState}`);
      wsRef.current?.close();
    };
    ws.onmessage = (event) => {
      // check ping message
      if (!event.data) {
        ws.send("pong");
        return;
      }
      // actual data, parse to models
      try {
        const wsData = JSON.parse(event.data) as NotificationWSData;
        // transform
        const transformedData = TransformToNotiDropdownData(wsData);
        setNotiData((prev) => {
          let newData = [...prev];
          // check noti data already hit max count
          if (newData.length >= MAX_NOTI_DATA) {
            newData.pop();
          }
          // insert from the top
          return [transformedData, ...newData];
        });
        setHasReadAll(false); // show noti bell
      } catch (err) {
        console.error(`ws cannot parse data: ${event.data} with error: ${err}`);
      }
    };
  };

  // setup and tear down lifecycle
  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (wsReconnectTimeoutRef.current) {
        clearTimeout(wsReconnectTimeoutRef.current);
      }
    };
  }, []);

  // user action on notification button
  const onNotiBtnClick = () => {
    setShowDropdown((prev) => !prev);
    setHasReadAll(true);
  };

  return {
    notiData,
    showDropdown,
    hasReadAll,

    // actions
    onNotiBtnClick,
  };
}
