export interface Company {
  _id?: string;
  nameCompany: string;
  typeCompany?: string;
  addressCompany?: string;
  telephoneCompany?: string;
  logo?: string;
  isConfigFull?: boolean;
  registerLicensesArray?: [];
  botContainerArray?: [];
}