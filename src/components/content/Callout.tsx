import { ParentComponent } from "solid-js";

export interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "note";
  title?: string;
  className?: string;
  icon?: boolean;
}

export const Callout: ParentComponent<CalloutProps> = (props) => {
  const type = () => props.type || "info";
  const showIcon = () => props.icon !== false;

  const typeStyles = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-900",
      icon: "text-blue-500",
      title: "text-blue-900"
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-900", 
      icon: "text-yellow-500",
      title: "text-yellow-900"
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-900",
      icon: "text-red-500", 
      title: "text-red-900"
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-900",
      icon: "text-green-500",
      title: "text-green-900"
    },
    note: {
      container: "bg-gray-50 border-gray-200 text-gray-900",
      icon: "text-gray-500",
      title: "text-gray-900"
    }
  };

  const getIcon = () => {
    switch (type()) {
      case "info":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        );
      case "warning":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case "error":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case "success":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        );
      case "note":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const styles = () => typeStyles[type()];

  return (
    <div class={`border-l-4 p-4 rounded-r-lg ${styles().container} ${props.className || ""}`}>
      <div class="flex">
        {showIcon() && (
          <div class={`flex-shrink-0 ${styles().icon} mr-3`}>
            {getIcon()}
          </div>
        )}
        <div class="flex-1">
          {props.title && (
            <h4 class={`font-medium mb-1 ${styles().title}`}>
              {props.title}
            </h4>
          )}
          <div class="callout-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;