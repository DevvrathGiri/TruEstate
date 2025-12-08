import { useState } from "react";
import {
  ChevronDown,
  LayoutGrid,
  Users,
  Clock,
  Briefcase,
  FileText,
  Clock as PreActive,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: NavItem[];
};

const navigationItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutGrid size={20} className="text-gray-600" />,
  },
  {
    id: "nexus",
    label: "Nexus",
    icon: <Users size={20} className="text-gray-600" />,
  },
  {
    id: "intake",
    label: "Intake",
    icon: <Clock size={20} className="text-gray-600" />,
  },
  {
    id: "services",
    label: "Services",
    icon: <Briefcase size={20} className="text-gray-600" />,
    subItems: [
      {
        id: "pre-active",
        label: "Pre-active",
        icon: <PreActive size={18} className="text-gray-500" />,
      },
      {
        id: "active",
        label: "Active",
        icon: <CheckCircle size={18} className="text-gray-500" />,
      },
      {
        id: "blocked",
        label: "Blocked",
        icon: <AlertCircle size={18} className="text-gray-500" />,
      },
      {
        id: "closed",
        label: "Closed",
        icon: <XCircle size={18} className="text-gray-500" />,
      },
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: <FileText size={20} className="text-gray-600" />,
    subItems: [
      {
        id: "proforma",
        label: "Proforma Invoices",
        icon: <FileText size={18} className="text-gray-500" />,
      },
      {
        id: "final",
        label: "Final Invoices",
        icon: <FileText size={18} className="text-gray-500" />,
      },
    ],
  },
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["services", "invoices"])
  );

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="w-64 h-screen bg-gray-50 flex flex-col">
     {/* User Profile Box */}
<div className="m-4 p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3 shadow-sm relative">
  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
    V
  </div>

  {/* Text */}
  <div className="flex-1 min-w-0">
    <p className="font-semibold text-gray-900 text-sm">Vault</p>
    <p className="text-xs text-gray-600">Devvrath Giri</p>
  </div>

  {/* Arrow Button — Vault Style */}
  <button
    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition"
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
</div>


      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
  {navigationItems.map((item) => {
    const isParent = !!item.subItems;
    const isOpen = expandedItems.has(item.id);

    return (
      <div
        key={item.id}
        className={`
          ${isParent ? "bg-white border border-gray-200 rounded-xl p-3 shadow-sm" : ""}
        `}
      >

        {/* PARENT BUTTON */}
        <button
          onClick={() => isParent && toggleExpand(item.id)}
          className={`w-full flex items-center justify-between px-2 py-2
            text-gray-800 rounded-lg transition-colors
            ${isParent ? "hover:bg-gray-50" : "hover:bg-gray-200"}
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>

          {isParent && (
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* SUB ITEMS */}
        {isParent && isOpen && item.subItems && (
          <div className="mt-2 space-y-1 pl-10">
            {item.subItems.map((subItem) => (
              <button
                key={subItem.id}
                className="w-full flex items-center gap-2 px-2 py-1.5
                  text-gray-700 hover:text-gray-900 transition-colors text-sm"
              >
                {subItem.icon}
                <span
                  className={
                    subItem.id === "proforma" ? "font-semibold" : ""
                  }
                >
                  {subItem.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  })}
</nav>

    </div>
  );
}
