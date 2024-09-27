"use client";
import Image from "next/image";
import logo from './images/logo_centered.png';
import file from './images/file.svg';
import { useState } from "react";

enum State {
  initial,
  loading,
  error,
}

export default function Home() {

  const [state, setState] = useState<State>(State.initial);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const valid = username && password && state !== State.loading;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark self-center"
          src={logo}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <>
          <p>歡迎光臨Myles HK會員專屬空間，請登入以繼續</p>

          <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="username">
                用戶名或郵箱
              </label>
              <input
                disabled={state === State.loading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="請輸入用戶名"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="password">
                密碼
              </label>
              <input
                disabled={state === State.loading}
                className={(state === State.error ? "border-red-500" : "") + " shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} id="password" type="password" placeholder="******************"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {state === State.error && (
                <p className="text-red-500 text-xs italic">
                  用戶名或密碼錯誤，請重試或聯絡我們
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button className={(valid ? "text-white" : "text-slate-600") + " bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
                onClick={() => {
                  setState(State.loading);
                  setTimeout(() => {
                    setState(State.error);
                  }, Math.random() * 3000 + 1000);
                }}
                disabled={!valid}
              >
                登入
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="mailto:cs@myles.hk">
                註冊（請聯絡我們）
              </a>
            </div>
          </form>
        </>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:cs@myles.hk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={file}
            alt="File icon"
            width={16}
            height={16}
          />
          聯絡我們
        </a>
      </footer>
    </div>
  );
}
