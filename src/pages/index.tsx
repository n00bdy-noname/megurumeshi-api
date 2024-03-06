import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

interface Shop {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  rating: number;
  isOpen: boolean;
  urls?: {
    pc: string;
  };
  photo?: {
    mobile: {
      s: string;
    };
  };
  genre?: {
    name: string;
  };
  catch?: string;
  access?: string;
}

interface Data {
  results: {
    results_available?: number;
    results_start?: number;
    shop?: Shop[];
  };
}

interface TokyoGourmetSearchProps {
  setPage: React.Dispatch<
    React.SetStateAction<{ results_available: number; results_start: number }>
  >;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const TokyoGourmetSearch: React.FC<TokyoGourmetSearchProps> = ({
  setPage,
  setKeyword,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlerOnSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from((currentTarget as HTMLFormElement).elements);
    const fieldQuery = fields.find((field: any) => field.name === "query");

    const value = (fieldQuery as HTMLInputElement)?.value || "";
    setKeyword(value);
  };

  return (
    <>
      <Head>
        <title>東京グルメ店検索</title>
      </Head>
      <div className="max-w-3xl font-mono bg-gray-100 mx-auto">
        <div>
          <div className="text-2xl py-6 text-center">
            <h2 className="font-medium tracking-wider">東京グルメ店検索</h2>
          </div>
          <div className="">
            <form onSubmit={handlerOnSubmitSearch} className="text-center">
              <input
                type="search"
                name="query"
                className="rounded py-2 px-4 text-left border-red-500"
                placeholder="キーワードを入力して下さい"
              />
              <button
                className="ml-2 text-white bg-red-500 rounded py-2 px-6 hover:opacity-75"
                disabled={loading} // ボタンをローディング中は無効にする
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
            <div className="text-sm pt-2 text-gray-600 text-center">
              <span>No data available</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TokyoGourmetSearchResult: React.FC<{ data: Data }> = ({ data }) => {
  if (!data || !data.results || !data.results.shop) {
    return <div>No shop data available</div>;
  }

  return (
    <>
      <Head>
        <title>東京のグルメを検索</title>
      </Head>
      <div className="max-w-3xl font-mono bg-gray-100 mx-auto">
        <ul className="mx-4">
          {data.results.shop.map((item: Shop, index: number) => (
            <li
              key={index}
              className="my-4 bg-white rounded border-red-500 border-2"
            >
              <Link href={item.urls?.pc || "#"}>
                <a>
                  <div className="grid grid-cols-10">
                    <div className="col-span-2 self-center">
                      <div>
                        <img src={item.photo?.mobile?.s} alt={item.name} />
                      </div>
                    </div>
                    <div className="ml-3 col-span-8">
                      <div className="text-lg mt-2 mr-2"> {item.name}</div>
                      <div className="text-xs mt-2 mr-2 pb-2">
                        <div className="text-xs">
                          <span className="font-medium">
                            {item.genre?.name}
                          </span>
                          <span className="ml-4">{item.catch}</span>
                        </div>
                        <p className="mt-1"> {item.access}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default function Home({ data }: { data: Data | undefined }) {
  const [page, setPage] = useState<{
    results_available: number;
    results_start: number;
  }>({
    results_available: 0,
    results_start: 1,
  });
  const [keyword, setKeyword] = useState<string>(""); // キーワードのステートを追加

  return (
    <div>
      <TokyoGourmetSearch setPage={setPage} setKeyword={setKeyword} />{" "}
      {/* 検索ボックスは常に表示 */}
      {data && keyword && <TokyoGourmetSearchResult data={data} />}{" "}
      {/* キーワードがあれば結果を表示 */}
    </div>
  );
}
