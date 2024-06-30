
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);

//         <QueryClientProvider client={queryClient}>
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         {/*<QueryClientProvider>*/}
//
//             <App />
//         {/*</QueryClientProvider>*/}
//     </React.StrictMode>
// );