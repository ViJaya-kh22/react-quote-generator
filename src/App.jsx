import React, { useState, useEffect } from 'react'
import tulip from "./assets/TulipMailSticker.jpg";
const App = () => {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("wisdom");
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.quotable.io/random?tags=${mood}`);


      const data = await response.json();
      console.log(data)


      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Something went wrong. Try again.");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  }

  const copyQuote = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, [mood])


  return (
    <div className='flex flex-col gap-3 h-screen w-screen mx-auto my-auto justify-center items-center bg-[url(/Img/download.jpg)]'>
      <div className='flex flex-col justify-center items-center 
  bg-white min-w-75 min-h-35 p-5 mx-20 rounded-2xl gap-2 relative'>

        <p className='text-center min-h-12'>
          {loading ? "Loading..." : quote}
        </p>

        <p className='font-bold h-6'>
          {loading ? "" : author}
        </p>

        <div
          className="absolute bottom-2 right-2 h-12 w-12 bg-cover bg-center"
          style={{ backgroundImage: `url(${tulip})` }}
        ></div>

      </div>

      <div className='flex gap-10'>
        <button className='cursor-pointer text-pink-900 font-bold relative' onClick={copyQuote}>
          Copy Quote

          {copied && (
            <span className='absolute -top-6 left-5 bg-gray-500 text-white text-xs px-2 py-1 rounded'>
              Copied!
            </span>
          )}

        </button>
        <button className='cursor-pointer text-pink-900 font-bold ' onClick={fetchData}>
          Next
        </button>
      </div>

      <div className='grid gap-5 grid-cols-2 '>
        <button className='px-3 py-2 bg-pink-500 rounded-2xl text-white cursor-pointer' onClick={() => setMood("motivational")}>💪 Motivational</button>
        <button className='px-3 py-2 bg-pink-500 rounded-2xl text-white cursor-pointer' onClick={() => setMood("love")}>❤️ Love</button>
        <button className='px-3 py-2 bg-pink-500 rounded-2xl text-white cursor-pointer' onClick={() => setMood("friendship")}>🫂 Friendship</button>
        <button className='px-3 py-2 bg-pink-500 rounded-2xl text-white cursor-pointer' onClick={() => setMood("wisdom")}>🧠 Wisdom</button>
      </div>

    </div>
  )
}

export default App
