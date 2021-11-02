import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { mediaTypes } from "./utils";
import "./App.scss";
import Logo from "./assets/logo2.png";
import Item from "./Component/Item";

export default function App() {
  const [items, setItems] = useState([]);
  const [num, setNum] = useState(10);
  const [term, setTerm] = useState("beyonce");
  const [media, setMedia] = useState("podcast");
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(true);

  // Fetching data

  const fetchData = async () => {
    setLoading(true);
    setNoResult(false);
    setNum(num + 10);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&entity=${media}&limit=${num}`
    );
    const data = await res.json();
    setItems(data.results);
    setLoading(false);
    setNoResult(data.results.length === 0);
  };

  // On Press enter fetch

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setItems([]);
      fetchData();
    }
  };

  // Fetch again on media change

  useEffect(() => {
    fetchData();
  }, [media]);

  return (
    <>
      {/* Header and search bar */}
      <header>
        <div className="logo">
          <img src={Logo} alt="" />
          {/* <h1>Search Music</h1> */}
        </div>
        <div className="searchForm">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <select onChange={(e) => setMedia(e.target.value.toLowerCase())}>
            {mediaTypes.map((media, i) => (
              <option key={i} value={media}>
                {media}
              </option>
            ))}
          </select>
          <button onClick={() => fetchData()}>Search</button>
        </div>
      </header>

      {/* List Area */}

      <main>
        {loading && <p>Loading...</p>}
        {noResult && <p>Please search again...</p>}
        {
          <div>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchData}
              hasMore={true}
              loader
            >
              <div className="itemContainer">
                {items?.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        }
      </main>
    </>
  );
}
