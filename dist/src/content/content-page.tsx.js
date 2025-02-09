import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/content-page.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--56f85069.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
    RefreshRuntime.register(type, "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--56f85069.js"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { BiData, BiPlus, BiSolidMagicWand } from "/vendor/.vite-deps-react-icons_bi.js__v--2770c4b3.js";
import Modal from "/src/components/Modal.tsx.js";
const ContentPage = () => {
  _s();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openSidebar = (contentType) => {
    chrome.runtime.sendMessage({ action: "openSidePanel", contentType });
  };
  return /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
        lineNumber: 14,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "buttons-wrapper fixed top-1/2 right-0 flex flex-col bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg z-50", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "p-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800",
          onClick: () => setIsModalOpen(true),
          children: /* @__PURE__ */ jsxDEV(
            BiSolidMagicWand,
            {
              color: "white",
              size: 30
            },
            void 0,
            false,
            {
              fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
              lineNumber: 23,
              columnNumber: 21
            },
            this
          )
        },
        void 0,
        false,
        {
          fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
          lineNumber: 19,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800",
          onClick: () => openSidebar("contexts"),
          children: /* @__PURE__ */ jsxDEV(
            BiData,
            {
              color: "white",
              size: 30
            },
            void 0,
            false,
            {
              fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
              lineNumber: 32,
              columnNumber: 21
            },
            this
          )
        },
        void 0,
        false,
        {
          fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
          lineNumber: 28,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("button", { className: "p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800", children: /* @__PURE__ */ jsxDEV(
        BiPlus,
        {
          color: "white",
          size: 30,
          onClick: () => openSidebar("addNewContext")
        },
        void 0,
        false,
        {
          fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
          lineNumber: 38,
          columnNumber: 21
        },
        this
      ) }, void 0, false, {
        fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
        lineNumber: 37,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
};
_s(ContentPage, "mLsII5HRP5G63IA/8vjZ5YHXWr8=");
_c = ContentPage;
export default ContentPage;
var _c;
$RefreshReg$(_c, "ContentPage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports)
        return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/content/content-page.tsx", currentExports, nextExports);
      if (invalidateMessage)
        import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
