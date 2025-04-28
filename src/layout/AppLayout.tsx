import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { PopupProvider, usePopup } from "../context/PopupContext"; // add this


const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isPopupOpen } = usePopup(); // 🔥 use this

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {/* AppHeader will be hidden if popup is open */}
        {!isPopupOpen && <AppHeader />}

        {/* Also optional: when popup open, remove extra padding */}
        <div className={`mx-auto ${isPopupOpen ? '' : 'p-4 md:p-6'} max-w-(--breakpoint-2xl)`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <PopupProvider> 
      <LayoutContent />
      </PopupProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
