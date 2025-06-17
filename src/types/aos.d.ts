declare module 'aos' {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: 'top-bottom' | 'top-center' | 'top-top' | 'center-bottom' | 'center-center' | 'center-top' | 'bottom-bottom' | 'bottom-center' | 'bottom-top';
    disable?: boolean | 'phone' | 'tablet' | 'mobile';
    startEvent?: string;
    animatedClassName?: string;
    initClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
  export function removeListener(): void;

  const AOS: {
    init: typeof init;
    refresh: typeof refresh;
    refreshHard: typeof refreshHard;
    removeListener: typeof removeListener;
  };

  export default AOS;
}
