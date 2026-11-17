
import { Link, useLocation } from "react-router-dom";

import {
  LayoutGrid,
  CircleDot,
  ListFilter,
  ArrowDownToLine,
  Play,
  CircleGauge,
  ArrowLeft,
  X,
} from "lucide-react";

type SidebarAdminProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation = [
  {
    label: "Tableau de bord",
    path: "/admin",
    icon: LayoutGrid,
  },
  {
    label: "Fiche équipe",
    path: "/admin/equipes/1",
    icon: CircleDot,
  },
  {
    label: "Quotas & attente",
    path: "/admin/quotas",
    icon: ListFilter,
  },
  {
    label: "Export PCO",
    path: "/admin/export",
    icon: ArrowDownToLine,
  },
  {
    label: "Formations",
    path: "/admin/formations",
    icon: Play,
  },
  {
    label: "Assiduité",
    path: "/admin/formations?tab=presence",
    icon: CircleGauge,
  },
];

export default function SidebarAdmin({
  isOpen,
  onClose,
}: SidebarAdminProps) {
  const location = useLocation();

  const pathname =
    location.pathname.replace(/\/+$/, "") || "/";

  const searchParams = new URLSearchParams(
    location.search
  );

  const activeTab = searchParams.get("tab");

  const estActif = (label: string): boolean => {
    switch (label) {
      case "Tableau de bord":
        return pathname === "/admin";

      case "Fiche équipe":
        return /^\/admin\/equipes\/[^/]+$/.test(
          pathname
        );

      case "Quotas & attente":
        return pathname === "/admin/quotas";

      case "Export PCO":
        return pathname === "/admin/export";

      case "Formations":
        return (
          pathname === "/admin/formations" &&
          activeTab !== "presence"
        );

      case "Assiduité":
        return (
          pathname === "/admin/formations" &&
          activeTab === "presence"
        );

      default:
        return false;
    }
  };

  return (
    <>
      {/* FOND SOMBRE MOBILE */}
      {isOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-[#0A1430]/50
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-[284px]
          shrink-0 flex-col

          overflow-y-auto
          overscroll-contain

          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden

          bg-[#F5F6FA]
          px-[22px] py-[28px]

          transition-transform duration-300

          lg:relative
          lg:inset-auto
          lg:z-auto
          lg:h-full
          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* LOGO */}
        <div className="mb-[38px] flex shrink-0 items-center justify-between px-2">
          <Link
            to="/"
            onClick={onClose}
            className="
              inline-flex flex-col
              text-center font-black
              leading-[0.78]
              tracking-[-0.05em]
              text-white
            "
            style={{
              fontSize: 22,
              WebkitTextStroke: "3px #0A2A65",
              paintOrder: "stroke fill",
              filter: "drop-shadow(2px 3px 0 #F58220)",
            }}
          >
            <span>GÉNIE</span>
            <span>UPB</span>
          </Link>

          <button
            type="button"
            aria-label="Fermer la navigation"
            onClick={onClose}
            className="
              rounded-lg p-2
              text-[#0A1430]
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav
          aria-label="Navigation responsable"
          className="flex shrink-0 flex-col gap-[7px]"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = estActif(item.label);

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`
                  flex h-[54px]
                  shrink-0 items-center
                  gap-[15px]
                  rounded-[20px]
                  px-[18px]
                  text-[16px]
                  transition-all duration-200

                  ${
                    active
                      ? `
                        bg-white
                        font-extrabold
                        text-[#0A1430]
                        shadow-[0_10px_22px_rgba(13,29,71,0.05)]
                      `
                      : `
                        font-semibold
                        text-[#283657]
                        hover:bg-white/70
                      `
                  }
                `}
              >
                {/* ICÔNE */}
                <span
                  className={`
                    flex h-[34px] w-[34px]
                    shrink-0 items-center
                    justify-center rounded-xl
                    transition-colors

                    ${
                      active
                        ? "bg-[#2F6BF0] text-white"
                        : "bg-[#E8ECF5] text-[#213765]"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={2.2}
                  />
                </span>

                {/* NOM DU MENU */}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* PARTIE INFÉRIEURE */}
        <div className="mt-auto shrink-0 pt-10">

          {/* CARTE ORANGE */}
          <div
            className="
              relative overflow-hidden
              rounded-[27px]
              bg-[#ED7327]
              px-[21px] py-[23px]
              text-[#0A1430]
            "
          >
            {/* CERCLE DÉCORATIF */}
            <div
              className="
                pointer-events-none
                absolute -right-8 -top-7
                h-[125px] w-[125px]
                rounded-full bg-white/20
              "
            />

            <div className="relative">
              <h3 className="text-[19px] font-black leading-[1.25]">
                Clôture des
                <br />
                inscriptions
              </h3>

              <p className="mt-[14px] text-[15px] font-semibold">
                18 décembre 2026
              </p>

              <Link
                to="/admin/export"
                onClick={onClose}
                className="
                  mt-[14px]
                  inline-flex min-h-[47px]
                  items-center justify-center
                  rounded-[14px]
                  bg-white px-[19px]
                  text-[14px] font-extrabold
                  text-[#0A1430]
                  transition hover:bg-[#F6F7FA]
                "
              >
                Préparer l'export
              </Link>
            </div>
          </div>

          {/* RETOUR AU SITE */}
          <Link
            to="/"
            onClick={onClose}
            className="
              mt-[32px]
              flex items-center gap-2
              px-4 text-[15px]
              font-semibold text-[#34476B]
              transition hover:text-[#2F6BF0]
            "
          >
            <ArrowLeft size={17} />
            Retour au site
          </Link>
        </div>
      </aside>
    </>
  );
}
