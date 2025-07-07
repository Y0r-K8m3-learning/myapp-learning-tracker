import { Link } from "react-router-dom";

export default function PlainHtml() {
  return (
    <div>
      <h2>純粋なHTMLページの埋め込み例</h2>
      <iframe
        src="/plain.html"
        width="100%"
        height="400px"
        style={{ border: "1px solid #aaa" }}
        title="Plain HTML"
      />
      <p>
        <Link to="/">← Reactデフォルトに戻る</Link>
      </p>
    </div>
  );
}
