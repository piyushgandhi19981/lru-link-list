import { useState } from "react";

import { useLRUCache } from "../hooks/useLRUCache";

const DynamicContentLoader = () => {
  const [content, setContent] = useState([]);

  const { get, put } = useLRUCache(3);

  const loadContent = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedContent = {
      id,
      text: `Tab ${id} Data`,
    };

    put(id, loadedContent);

    setContent((prevContent) => [...prevContent, loadedContent]);
  };

  const handleBtnClick = (id) => {
    const cachedContent = get(id);
    if (cachedContent !== -1) {
      console.log(`Content ${id} loaded from cache`);
      setContent((prevContent) => [...prevContent, cachedContent]);
    } else {
      console.log(`Loading content ${id}`);
      loadContent(id);
    }
  };

  return (
    <div>
      <h2>Dynamic Content Loader with LRU Cache</h2>
      <button onClick={() => handleBtnClick(1)}>Tab 1</button>
      <button onClick={() => handleBtnClick(2)}>Tab 2</button>
      <button onClick={() => handleBtnClick(3)}>Tab 3</button>
      <button onClick={() => handleBtnClick(4)}>Tab 4</button>
      <button onClick={() => handleBtnClick(5)}>Tab 5</button>
      <div>
        <h3>Loaded Content</h3>
        <ul>
          {content.map((item, i) => {
            return <li key={`${item.id}${i}`}>{item.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DynamicContentLoader;
