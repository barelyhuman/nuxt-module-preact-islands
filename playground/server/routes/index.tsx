import Counter from "../../components/Counter.jsx";
import renderToString from "preact-render-to-string";
import { h } from "preact";

export default defineEventHandler(() => {
  return renderToString(h(Counter, {}));
});
