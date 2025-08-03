export interface AddressType {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface fromFieldsType {
  label: string;
  placeHolder?: string;
  name: keyof AddressType;
  required: boolean;
}
