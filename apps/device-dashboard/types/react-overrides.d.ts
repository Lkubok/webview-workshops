declare module "react" {
  interface JSXElementConstructor<P> {
    (props: P, deprecatedLegacyContext?: any): React.ReactElement<any, any> | null;
  }
}