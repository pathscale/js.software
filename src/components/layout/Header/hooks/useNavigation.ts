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

  // Solid 2 splits an effect in two: the first function tracks and returns,
  // the second acts on that value. The one-argument form throws
  // MISSING_EFFECT_FN.
  createEffect(
    () => location.pathname,
    (currentPath) => {
      const mainPages = [ROUTES.HOME, ROUTES.DOCS, ROUTES.SHOWCASES];

      if (mainPages.includes(currentPath as any)) {
        setActiveCategory(null);
        setIsNavbarExpanded(false);
      }
    },
  );

  createEffect(
    () => activeCategory() !== null,
    (hasExpandedMenu) => {
      setIsNavbarExpanded(hasExpandedMenu);
    },
  );

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