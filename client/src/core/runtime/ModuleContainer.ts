import {
  asClass,
  asFunction,
  asValue,
  AwilixContainer,
  BuildResolverOptions,
  Constructor,
  createContainer,
  InjectionMode,
  Resolver
} from "awilix";
import Application from "../../Application";
import CredentialsService from "../../authentication/service/CredentialsService";
import HomeArea from "../../home/area/HomeArea";
import { UserPreferences } from "../common/Constants";
import CreateResourceInteractor from "../interactor/app/crud/CreateResourceInteractor";
import DeleteResourceInteractor from "../interactor/app/crud/DeleteResourceInteractor";
import FindResourceEntryInteractor from "../interactor/app/crud/FindResourceEntryInteractor";
import GetAllResourceEntriesInteractor from "../interactor/app/crud/GetResourceEntriesInteractor";
import GetResourceTextValueInteractor from "../interactor/app/crud/GetResourceTextValueInteractor";
import UpdateResourceInteractor from "../interactor/app/crud/UpdateResourceInteractor";
import HandleApplicationErrorInteractor from "../interactor/app/HandleApplicationErrorInteractor";
import InteractorProxy from "../interactor/InteractorProxy";
import ShowErrorMessageInteractor from "../interactor/notifications/ShowErrorMessageInteractor";
import ShowInfoMessageInteractor from "../interactor/notifications/ShowInfoMessageInteractor";
import ShowSuccessMessageInteractor from "../interactor/notifications/ShowSuccessMessageInteractor";
import ShowWarningMessageInteractor from "../interactor/notifications/ShowWarningMessageInteractor";
import { InMemoryCacheManager } from "../model/runtime/cache/InMemoryCacheManager";
import Dispatcher from "../model/runtime/state/Dispatcher";
import Store from "../model/runtime/state/Store";
import CryptographyProvider from "../model/security/CryptographyProvider";
import RandomValueProvider from "../model/security/RandomValueProvider";
import { ApplicationService } from "../service/ApplicationService";
import CachingHttpService from "../service/CachingHttpService";
import CookieStorageService from "../service/CookieStorageService";
import CryptographyService from "../service/cryptography/CryptographyService";
import HttpService from "../service/HttpService";
import LocaleProvider from "../service/locale/LocaleProvider";
import TranslationService from "../service/locale/TranslationService";
import NotificationService from "../service/notification/NotificationService";
import SimpleCRUDServiceFactory from "../service/SimpleCRUDServiceFactory";
import StorageService from "../service/StorageService";
import IModuleContainer from "./IModuleContainer";

const ModuleContainer = (
  application: Application,
  container?: any
): IModuleContainer => {
  const _application = application;
  const _container =
    container ||
    createContainer({
      injectionMode: InjectionMode.PROXY
    });

  function withCache(moduleName: string, timeToLiveMs?: number) {
    return (c) => ({
      httpService: CachingHttpService({
        http: _container.resolve("http"),
        cacheManager: _container.resolve("cacheManager"),
        options: {
          name: moduleName,
          timeToLive: timeToLiveMs !== undefined ? timeToLiveMs : 0
        }
      })
    });
  }

  function asInteractor<T = {}>(
    Type: Constructor<T>,
    opts?: BuildResolverOptions<T>
  ): Resolver<T> {
    return {
      resolve: (container: AwilixContainer) => {
        var interactor = container.build(asClass(Type, opts));
        return new InteractorProxy({
          interactor,
          handleApplicationError:
            container.resolve<HandleApplicationErrorInteractor>(
              "handleApplicationError"
            ),
          application: _application
        }) as any as T;
      }
    };
  }

  const Config = import.meta.env;
  _container.register({
    // config: asFunction(Configuration).singleton(),
    // configurationProvider: asFunction(
    //   EnvironmentConfigurationProvider
    // ).singleton(),
    application: asValue(_application),
    container: asValue(_container),
    baseUrl: asValue(Config.VITE_API_URL),
    options: asValue(null),
    cacheManager: asFunction(InMemoryCacheManager).singleton(),
    language: asValue(UserPreferences.DEFAULT_LANGUAGE),
    localeProvider: asFunction(LocaleProvider).singleton(),
    dispatcher: asFunction(Dispatcher).singleton(),
    handleApplicationError: asClass(HandleApplicationErrorInteractor),
    store: asFunction(Store)
      .singleton()
      .inject((c) => ({
        dispatcher: _container.resolve("dispatcher"),
        defaultTopic: "app",
        initialState: {}
      })),
    defaultSettings: asValue(Config)
  });

  //services
  _container.register({
    storageService: asFunction(StorageService),
    cookieStorageService: asFunction(CookieStorageService),
    httpService: asFunction(CachingHttpService),
    http: asFunction(HttpService),
    translationService: asFunction(TranslationService),
    cryptographyProvider: asFunction(CryptographyProvider),
    randomValueProvider: asFunction(RandomValueProvider),
    cryptographyService: asFunction(CryptographyService),
    notificationService: asFunction(NotificationService),
    simpleCRUDServiceFactory: asFunction(SimpleCRUDServiceFactory),
    applicationService: asFunction(ApplicationService),
    credentialsService: asFunction(CredentialsService)
  });

  //areas
  _container.register({
    homeArea: asClass(HomeArea).singleton()
  });

  //interactors
  _container.register({
    showSuccessMessage: asInteractor(ShowSuccessMessageInteractor),
    showErrorMessage: asInteractor(ShowErrorMessageInteractor),
    showWarningMessage: asInteractor(ShowWarningMessageInteractor),
    showInfoMessage: asInteractor(ShowInfoMessageInteractor),
    getAllResourceEntries: asInteractor(GetAllResourceEntriesInteractor),
    createResource: asInteractor(CreateResourceInteractor),
    updateResource: asInteractor(UpdateResourceInteractor),
    deleteResource: asInteractor(DeleteResourceInteractor),
    findResourceEntry: asInteractor(FindResourceEntryInteractor),
    getResourceTextValue: asInteractor(GetResourceTextValueInteractor)
  });

  return {
    asInteractor,
    asFunction,
    register: _container.register,
    resolve<T>(name: string) {
      return _container.resolve(name) as T;
    },
    registerValue(name: string, dependency: any) {
      _container.register(name, asValue(dependency));
    },
    registerClass(name: string, dependency: any) {
      _container.register(name, asClass(dependency));
    },
    registerInteractor(name: string, dependency: any) {
      _container.register(name, asInteractor(dependency));
    },
    registerFunction(name: string, dependency: any, cacheName?: string) {
      _container.register(
        name,
        cacheName
          ? asFunction(dependency).inject(withCache(cacheName))
          : asFunction(dependency)
      );
    },
    createScope() {
      return ModuleContainer(_application, _container.createScope());
    }
  } as IModuleContainer;
};

export default ModuleContainer;
