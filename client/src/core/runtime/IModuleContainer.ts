export default interface IModuleContainer {
  resolve<T>(name: string): T;
  registerValue(name: string, dependency: any): void;
  registerInteractor(name: string, dependency: any): void;
  registerClass(name: string, dependency: any): void;
  registerFunction(name: string, dependency: any, cacheName?: string): void;
  createScope(): IModuleContainer;
}
