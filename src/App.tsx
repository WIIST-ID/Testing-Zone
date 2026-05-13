/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface VideoProps {
  videoId: string;
  badgeLabel: string;
  badgeCustomStyle?: React.CSSProperties;
  label?: string;
  isShaking?: boolean;
}

const VideoCard: React.FC<VideoProps> = ({
  videoId,
  badgeLabel,
  badgeCustomStyle,
  label,
  isShaking = false,
}) => {
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTitle() {
      try {
        const res = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
        );
        const data = await res.json();
        if (data.title) {
          setTitle(data.title);
        }
      } catch (e) {
        // Fallback or ignore
      } finally {
        setIsLoading(false);
      }
    }
    fetchTitle();
  }, [videoId]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const androidUrl = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;

    if (isAndroid) {
      e.preventDefault();
      window.location.href = androidUrl;
      setTimeout(() => {
        window.location.href = webUrl;
      }, 500);
    }
  };

  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div
      className={`bg-card-bg rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5 ${
        isShaking ? 'shake-card' : ''
      }`}
    >
      <a
        href={webUrl}
        onClick={handleLinkClick}
        className="block no-underline text-inherit"
      >
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`${title || 'Video'} thumbnail`}
            className="w-full h-full object-cover block"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-200 hover:bg-black/15 group">
            <div className="w-[52px] h-[52px] bg-red-600 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(255,0,0,0.5)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          <span
            className="absolute bottom-2.5 left-2.5 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={badgeCustomStyle}
          >
            {badgeLabel}
          </span>
        </div>
        <div className="p-3.5 pt-3 pb-3.5">
          {label && (
            <div className="text-[#aaa] text-[11px] font-semibold uppercase tracking-wide mb-1.5">
              {label}
            </div>
          )}
          <div
            className={`text-white text-sm font-semibold leading-tight mb-2 card-title-clamp ${
              isLoading ? 'animate-shimmer w-4/5 h-[18px] rounded-md' : ''
            }`}
          >
            {!isLoading && title}
          </div>
        </div>
      </a>
    </div>
  );
};

export default function App() {
  const channelId = "UCMEiJQkHSiP_v8g2v_iEEww";
  const webUrl = `https://www.youtube.com/channel/${channelId}`;

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const androidUrl = `intent://www.youtube.com/channel/${channelId}#Intent;package=com.google.android.youtube;scheme=https;end`;

    if (isAndroid) {
      e.preventDefault();
      window.location.href = androidUrl;
      setTimeout(() => {
        window.location.href = webUrl;
      }, 500);
    }
  };

  return (
    <div className="flex justify-center items-center p-8 px-4 font-sans w-full">
      <div className="flex flex-col items-center gap-6 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-3">
          <a
            href={webUrl}
            onClick={handleProfileClick}
            className="block no-underline text-inherit hover:scale-105 transition-transform duration-200"
          >
            <img
              src="/1ind.png"
              alt="WIIST ID Profile Picture"
              className="w-[100px] h-[100px] rounded-full border-[3px] border-red-600 object-cover shadow-[0_4px_12px_rgba(255,0,0,0.3)]"
            />
          </a>
          <h1 className="text-white text-2xl font-bold">WIIST ID</h1>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* VIDEO 1 */}
          <VideoCard
            videoId="JQ4lCrtw9Jo"
            badgeLabel="✨ Terbaru"
            badgeCustomStyle={{ background: '#333', border: '1px solid #555' }}
            label="Video terbaru"
            isShaking={true}
          />

          {/* VIDEO 2 - Viral video */}
          <VideoCard videoId="5qD4uq2NF-c" badgeLabel="🔥 Viral" />
        </div>
      </div>
    </div>
  );
}
