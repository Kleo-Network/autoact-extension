import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/Pills.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--56f85069.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import RefreshRuntime from "/vendor/react-refresh.js";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Pills.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
const Pills = ({
  options,
  selectedOption,
  onSelectionChange
}) => {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-3", children: options.map(
    (option) => /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: `px-3 py-2 rounded-full border transition-all duration-200 ease-linear ${selectedOption === option ? "bg-blue-600 text-white border-blue-600 hover:cursor-default" : "bg-white text-blue-600 border-blue-600 hover:bg-slate-200 hover:cursor-pointer"}`,
        onClick: () => onSelectionChange(option),
        children: option
      },
      option,
      false,
      {
        fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Pills.tsx",
        lineNumber: 17,
        columnNumber: 7
      },
      this
    )
  ) }, void 0, false, {
    fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Pills.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
};
_c = Pills;
export default Pills;
var _c;
$RefreshReg$(_c, "Pills");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Pills.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports)
        return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Pills.tsx", currentExports, nextExports);
      if (invalidateMessage)
        import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
