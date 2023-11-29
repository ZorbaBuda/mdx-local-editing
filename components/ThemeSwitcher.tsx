"use client";

// import config from "@/data/config.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = ({ className }: { className: string }) => {
  // const { theme_switcher } = config.settings;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* {theme_switcher && ( */}
        <div className={`theme-switcher ${className}`}>
          <input
            id="theme-switcher"
            type="checkbox"
            defaultChecked={
              mounted && (theme === "dark" || resolvedTheme === "dark")
            }
            onClick={() =>
              setTheme(
                theme === "dark" || resolvedTheme === "dark" ? "light" : "dark",
              )
            }
          />
          <label htmlFor="theme-switcher">
            <span className="sr-only">theme switcher</span>
            <span>
              <svg
                className="absolute left-[4px] top-[4px] z-10 opacity-100 dark:opacity-0"
                viewBox="0 0 56 56"
                fill="#fff"
                height="16"
                width="16"
              >
                <path d="M30 4.6c0-1-.9-2-2-2a2 2 0 0 0-2 2v5c0 1 .9 2 2 2s2-1 2-2Zm9.6 9a2 2 0 0 0 0 2.8c.8.8 2 .8 2.9 0L46 13a2 2 0 0 0 0-2.9 2 2 0 0 0-3 0Zm-26 2.8c.7.8 2 .8 2.8 0 .8-.7.8-2 0-2.9L13 10c-.7-.7-2-.8-2.9 0-.7.8-.7 2.1 0 3ZM28 16a12 12 0 0 0-12 12 12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-12-12Zm23.3 14c1.1 0 2-.9 2-2s-.9-2-2-2h-4.9a2 2 0 0 0-2 2c0 1.1 1 2 2 2ZM4.7 26a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4.9c1 0 2-.9 2-2s-1-2-2-2Zm37.8 13.6a2 2 0 0 0-3 0 2 2 0 0 0 0 2.9l3.6 3.5a2 2 0 0 0 2.9 0c.8-.8.8-2.1 0-3ZM10 43.1a2 2 0 0 0 0 2.9c.8.7 2.1.8 3 0l3.4-3.5c.8-.8.8-2.1 0-2.9-.8-.8-2-.8-2.9 0Zm20 3.4c0-1.1-.9-2-2-2a2 2 0 0 0-2 2v4.9c0 1 .9 2 2 2s2-1 2-2Z"></path>
              </svg>

              <svg
                className="absolute left-[4px] top-[4px] z-10 opacity-0 dark:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                height="16"
                width="16"
              >
                <path
                  fill="#000"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.2 2.2c1-.4 2 .6 1.6 1.5-1 3-.4 6.4 1.8 8.7a8.4 8.4 0 0 0 8.7 1.8c1-.3 2 .5 1.5 1.5v.1a10.3 10.3 0 0 1-9.4 6.2A10.3 10.3 0 0 1 3.2 6.7c1-2 2.9-3.5 4.9-4.4Z"
                ></path>
              </svg>
            </span>
          </label>
        </div>
      {/* )} */}
    </>
  );
};

export default ThemeSwitcher;
