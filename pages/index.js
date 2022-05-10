import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [emailParams, setEmailParams] = useState({
    tags:"formal",
    recipients:"",
    senders:"",
    questions:""
  });
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailParams),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
    // setEmailParams({
    //   tags:"formal",
    //   recipients:"",
    //   senders:"",
    //   questions:""
    // });
  }

  const copyEmail = async() =>{
    await navigator.clipboard.writeText(result);
    alert("Email Copied!");
  }


  return (
    <div>
      <Head>
        <title>Email Generator</title>
        <link rel="icon" href="/envelope-solid.svg" />
        <link rel="apple-touch-icon"  href="/envelope-solid.svg" />
      </Head>
      <meta 
        name='viewport' 
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' 
      />
      <div className={styles["github-link"]} onClick={()=>{window.open('https://github.com/ocapraro/email-generator', '_blank');}}>
        <img width="100%" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
      </div>

      <main className={styles.main}>
        <div className={styles["email-header"]}>
          New Message
          <div title="Copy Email" style={{height: "24px"}} onClick={copyEmail}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/></svg>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles["input-group"]}>
            <label>
              To
              <input
                type="text"
                name="recipients"
                // placeholder="Enter the recipient/s"
                value={emailParams.recipients}
                onChange={(e) => setEmailParams((data)=>({...data, recipients:e.target.value}))}
              />
            </label>
            <label>
              From
              <input
                type="text"
                name="senders"
                // placeholder="Enter the sender/s"
                value={emailParams.senders}
                onChange={(e) => setEmailParams((data)=>({...data, senders:e.target.value}))}
              />
            </label>
          </div>
          <div className={styles["input-group"]}>
            <label>
              Tags
              <input
                type="text"
                name="tags"
                value={emailParams.tags}
                onChange={(e) => setEmailParams((data)=>({...data, tags:e.target.value}))}
              />
            </label>
            <label>
              Questions
              <input
                type="text"
                name="questions"
                value={emailParams.questions}
                onChange={(e) => setEmailParams((data)=>({...data, questions:e.target.value}))}
              />
            </label>
          </div>
          <textarea className={styles.result} style={loading?{color:"#ccc"}:{}} value={result} />
          <div className={styles["button-group"]}>
            <input type="submit" className={styles.button} disabled={loading} value={loading?"Loading...":"Generate Email"} />
            <div id={styles.copy} className={styles.button} style={{backgroundColor:"#F4F4F4", color:"unset"}} onClick={copyEmail}>Copy Email</div>
          </div>
        </form>
      </main>
    </div>
  );
}
