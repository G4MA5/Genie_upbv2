
import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

import SidebarAdmin from "../components/layout/SidebarAdmin";
import { PageLoader } from "../components/ui/PageLoader";

export default function StructureAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openAdminMenu = () => {
    setMenuOpen(true);
  };

  const closeAdminMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#E9EBF0]
        font-sans

        lg:h-screen
        lg:overflow-hidden
        lg:p-[18px]
      "
    >
      {/* CONTENEUR ADMIN */}
      <div
        className="
          mx-auto flex min-h-screen
          w-full max-w-[1920px]
          bg-white

          shadow-[0_20px_70px_rgba(10,20,48,0.06)]

          lg:h-full
          lg:min-h-0
          lg:overflow-hidden
          lg:rounded-[35px]
        "
      >
        {/* SIDEBAR */}
        <SidebarAdmin
          isOpen={menuOpen}
          onClose={closeAdminMenu}
        />

        {/* CONTENU PRINCIPAL */}
        <div
          className="
            min-w-0 flex-1

            lg:h-full
            lg:overflow-y-auto
            lg:overscroll-contain

            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet
              context={{
                openAdminMenu,
                closeAdminMenu,
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
