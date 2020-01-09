import React, { useState, useEffect } from "react";
import ky from "ky";
import interval from "interval-promise";

function App() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(["chat intiating..."]);

  const sendMsg = async () => {
    await ky.post("api/msg", { json: { msg: text } });
    setText("");
  };

  useEffect(() => {
    setInterval(async () => {
      const res = await ky.get("api/msg").json();
      if (res !== "") setMsgs(m => [...m, res]);
    }, 5000);
  }, []);

  // setInterval(async () => {
  //   const res = await ky.get("api/msg").json();
  //   if (res !== "") setMsgs([...msgs, res]);
  // }, 5000);

  return (
    <main>
      <h1>Messenger</h1>

      <div>{msgs.length && msgs.map(m => <p key={m}>{m}</p>)}</div>

      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="button" className="btn" onClick={sendMsg}>
          send
        </button>
      </div>
    </main>
  );
}

export default App;
