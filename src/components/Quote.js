import { useEffect, useState } from "react";

export default function Quote() {
  function newtab(href) {
    let a = document.createElement("a");
    a.href = href;
    a.setAttribute("target", "_blank");
    a.click();
    a.remove();
  }
  const [qod, setQod] = useState("");
  const [author, setAuthor] = useState("");
  const [loaded, setLoaded] = useState(false);
  async function getQod() {
    try {
      const res = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await res.json();
      if (!res.ok) throw new Error("Error when attempting to fetch quote.");
      setQod(data.quote);
      setAuthor(data.author);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQod();
  }, []);

  return (
    loaded && (
      <div className="quote">
        <p>{qod}</p>
        <span onClick={() => newtab(`https://en.wikipedia.org/wiki/${author}`)}>
          - {author}
        </span>
      </div>
    )
  );
}
