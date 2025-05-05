import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { CartProvider } from './context/CartContext.tsx'; // adjust the path
import { StoreProvider } from './context/StoreContext.tsx'; // adjust the path as needed
import { GoodRequestProvider } from './context/GoodRequestContext.tsx'; // adjust the path as needed

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <StoreProvider>
        <CartProvider>
        <GoodRequestProvider>
        <App />
        </GoodRequestProvider>
        </CartProvider>
        </StoreProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
