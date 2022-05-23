import _ from "lodash";

export interface IApplicationService {
  convertBufToImg(buf): string;
  formatPhoto(value: any, type?: any, name?: any): File;
  getBase64(file: any): Promise<any>;
  distinctArray(array: any[], prop?: string): any[];
  sortTimes(array: string[]): string[];
  dynamicSort(
    property: string,
    isOrderByDesc?: boolean
  ): (a: any, b: any) => number;
  objectKeysToCamelCase(object: any): any;
  isHTML(value: string): boolean;
  extractContentFromHtml(value: string): string;
}

const ApplicationService = (): IApplicationService => {
  return {
    convertBufToImg(buf) {
      const blob = new Blob([buf], {
        type: "image/png"
      });
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);
      return imageUrl;
    },
    formatPhoto(value: any, type?: any, name?: any) {
      if (!type) {
        type = "image/png";
      }
      if (!name) {
        name = "img.png";
      }
      var temp = new Blob([value], { type: type });
      var myblob: any = temp;
      myblob.name = name;
      return myblob as File;
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    distinctArray(array: any[], prop?: string) {
      return array.filter(
        (item, i, arr) =>
          arr.findIndex((t) => (prop ? t[prop] === item[prop] : t === item)) ===
          i
      );
    },
    sortTimes(array: string[]) {
      return array.sort(function (a, b) {
        if (parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]) === 0) {
          return parseInt(a.split(":")[1]) - parseInt(b.split(":")[1]);
        } else {
          return parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
        }
      });
    },
    dynamicSort(property: string, isOrderByDesc?: boolean) {
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        let result;
        if (isOrderByDesc) {
          result =
            a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
        } else {
          result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        }

        return result * sortOrder;
      };
    },
    objectKeysToCamelCase(object: any) {
      if (!_.isObject(object)) {
        return object;
      } else if (_.isArray(object)) {
        return object.map((v) => this.objectKeysToCamelCase(v));
      }
      return _.reduce(
        object,
        (r, v, k) => {
          return {
            ...r,
            [_.camelCase(k)]: this.objectKeysToCamelCase(v)
          };
        },
        {}
      );
    },
    isHTML(value: string) {
      var a = document.createElement("div");
      a.innerHTML = value;

      for (var c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType === 1) return true;
      }

      return false;
    },
    extractContentFromHtml(value: string) {
      var extracted = value.split("</style>").pop() || value;

      return (
        new DOMParser().parseFromString(extracted, "text/html").documentElement
          .textContent ?? "-"
      );
    }
  };
};

export { ApplicationService };
