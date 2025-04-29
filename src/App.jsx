import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <div className="bg-slate-500 h-screen">
      <div className="flex justify-center items-center h-screen">
        <Suspense fallback={<>Loading...</>}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
