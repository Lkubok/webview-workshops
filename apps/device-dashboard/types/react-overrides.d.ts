// React 19 compatibility overrides for Workshop components
// This file provides compatibility shims for React 18/19 type differences

declare global {
  namespace React {
    // Allow more flexible ReactNode type for compatibility
    type ReactNode = any;

    // More flexible component props
    type ComponentProps<T> = any;
    type ComponentPropsWithoutRef<T> = any;
    type ElementRef<T> = any;
    type ReactElement<P = any, T = any> = any;

    // Flexible JSX element constructor for compatibility
    interface JSXElementConstructor<P> {
      (props: P, ...args: any[]): any;
    }
  }

  // Override JSX namespace for better compatibility
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementClass {
      render(): any;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

// Export to make this a module
export {};