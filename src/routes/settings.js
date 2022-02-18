import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Settings</h2>
      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/settings">Settings</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </main>
  );
}