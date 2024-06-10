import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AlertProvider from "./providers/AlertProvider";
import GlobalFunctionsProvider from "./providers/GlobalFunctionsProvider";
import MaterialUIProvider from "./providers/MaterialUIProvider";
import Router from "./router";
import { persistor, store } from "./store";
import "./i18next";
import { Suspense } from "react";
import PageFallback from "./components/PageFallback";
import { QueryClientProvider } from "react-query";
import queryClient from "./services/queryClient";

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <MaterialUIProvider>
                <AlertProvider>
                  <GlobalFunctionsProvider />
                  <BrowserRouter>
                    <Router />
                  </BrowserRouter>
                </AlertProvider>
              </MaterialUIProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </div>
    </Suspense>
  );
}

export default App;
