import Model from "../../core/model/Model";

export interface TGuaranteeUser {
  id?: number;
  bankId: string;
  name: string;
  maximumExposureAmount: number;
  marketSharePercentage: number;
  guaranteeUserTypeId: number;
  cooperationAgreement?: string;
  valid: boolean;
}

export interface IGuaranteeUser extends TGuaranteeUser {}

const GuaranteeUser = Model(
  (model: TGuaranteeUser): IGuaranteeUser => {
    const _value: TGuaranteeUser = Object.assign({}, model);

    return {
      get id() {
        return _value.id;
      },
      set id(id) {
        _value.id = id;
      },
      get bankId() {
        return _value.bankId;
      },
      set bankId(bankId) {
        _value.bankId = bankId;
      },
      get name() {
        return _value.name;
      },
      set name(name) {
        _value.name = name;
      },
      get maximumExposureAmount() {
        return _value.maximumExposureAmount;
      },
      set maximumExposureAmount(maximumExposureAmount) {
        _value.maximumExposureAmount = maximumExposureAmount;
      },
      get marketSharePercentage() {
        return _value.marketSharePercentage;
      },
      set marketSharePercentage(marketSharePercentage) {
        _value.marketSharePercentage = marketSharePercentage;
      },
      get guaranteeUserTypeId() {
        return _value.guaranteeUserTypeId;
      },
      set guaranteeUserTypeId(guaranteeUserTypeId) {
        _value.guaranteeUserTypeId = guaranteeUserTypeId;
      },
      get cooperationAgreement() {
        return _value.cooperationAgreement;
      },
      set cooperationAgreement(cooperationAgreement) {
        _value.cooperationAgreement = cooperationAgreement;
      },
      get valid() {
        return _value.valid;
      },
      set valid(valid) {
        _value.valid = valid;
      }
    };
  }
);

export default GuaranteeUser;
