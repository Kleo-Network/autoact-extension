import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/Modal.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--56f85069.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
    RefreshRuntime.register(type, "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--56f85069.js"; const useState = __vite__cjsImport3_react["useState"];
import { BiSolidXCircle } from "/vendor/.vite-deps-react-icons_bi.js__v--2770c4b3.js";
import Pills from "/src/components/Pills.tsx.js";
const Modal = ({ isOpen, onClose }) => {
  _s();
  const [selectedOption, setSelectedOption] = useState("Fill Form"), [selectedContext, setSelectedContext] = useState("Context 1"), [prompt, setPrompt] = useState("");
  const handleSelectionChange = (option) => {
    setSelectedOption(option);
  };
  const handleContextChange = (context) => {
    setSelectedContext(context);
  };
  if (!isOpen)
    return null;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "modal fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[1000] flex justify-center items-center",
      onClick: onClose,
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "bg-white rounded-lg w-full max-w-screen-sm flex flex-col gap-y-4 p-4",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV(
                Pills,
                {
                  options: ["Fill Form", "Chat"],
                  selectedOption,
                  onSelectionChange: handleSelectionChange
                },
                void 0,
                false,
                {
                  fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
                  lineNumber: 35,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("button", { onClick: onClose, children: /* @__PURE__ */ jsxDEV(
                BiSolidXCircle,
                {
                  color: "gray",
                  size: 30
                },
                void 0,
                false,
                {
                  fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
                  lineNumber: 41,
                  columnNumber: 25
                },
                this
              ) }, void 0, false, {
                fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
                lineNumber: 40,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
              lineNumber: 34,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              Pills,
              {
                options: [
                  "Context 1",
                  "Context 2",
                  "Context 3",
                  "Context 4"
                ],
                selectedOption: selectedContext,
                onSelectionChange: handleContextChange
              },
              void 0,
              false,
              {
                fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
                lineNumber: 47,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                className: "w-full bg-slate-200 border border-gray-200 p-2 rounded-lg focus:outline-none focus:border-2 focus:border-blue-600",
                value: prompt,
                onChange: (e) => setPrompt(e.target.value)
              },
              void 0,
              false,
              {
                fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
                lineNumber: 57,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("button", { className: "w-fit self-end bg-blue-600 text-white rounded-lg font-medium transition-colors duration-100 ease-linear px-4 py-2 hover:bg-blue-700", children: "Run" }, void 0, false, {
              fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
              lineNumber: 63,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
          lineNumber: 30,
          columnNumber: 13
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    this
  );
};
_s(Modal, "RvOpDA2oRckKC5kXW2qLq/n1/2A=");
_c = Modal;
export default Modal;
var _c;
$RefreshReg$(_c, "Modal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports)
        return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/vaibhavgeek/autoact/AutoAct-Chrome-Extension/src/components/Modal.tsx", currentExports, nextExports);
      if (invalidateMessage)
        import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
