import { createSignal, createEffect, createMemo } from "solid-js";
import { useLocation } from "@solidjs/router";
import { setIsNavbarExpanded } from "../../LayoutGrid";
import { navigationItems } from "../navigationData";
import { ROUTES } from "../../../../config/routes";

export const useNavigation = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeCategory, setActiveCategory] = createSignal<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };


  const getSelectedSubcategory = () => {
    const componentsItem = navigationItems.find(
      (item) => item.title === "Components"
    );
    
    if (activeCategory() && activeCategory() !== "Components") {
      return componentsItem?.subcategories?.find(
        (cat) => cat.title === activeCategory()
      );
    } else if (activeCategory() === "Components") {
      return componentsItem?.subcategories?.[0];
    }
    return null;
  };

  const shouldShowComponentsMenu = () => {
    return activeCategory() === "Components" || 
           (activeCategory() && activeCategory() !== "Components");
  };

  createEffect(() => {
    const currentPath = location.pathname;
    const mainPages = [ROUTES.HOME, ROUTES.DOCS, ROUTES.SHOWCASES];
    
    if (mainPages.includes(currentPath as any)) {
      setActiveCategory(null);
      setIsNavbarExpanded(false);
    }
  });

  createEffect(() => {
    const hasExpandedMenu = activeCategory() !== null;
    setIsNavbarExpanded(hasExpandedMenu);
  });

  return {
    isOpen,
    setIsOpen,
    activeCategory,
    setActiveCategory,
    isActive,
    getSelectedSubcategory,
    shouldShowComponentsMenu,
  };
};