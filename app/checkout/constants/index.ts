import { fromFieldsType } from "../types";

export const FORM_FIELDS: fromFieldsType[] = [
  {
    label: "Full Name",
    name: "name",
    placeHolder: "Enter name",
    required: true,
  },
  {
    label: "Address Line 1",
    name: "addressLine1",
    placeHolder: "Enter Address line 1",
    required: true,
  },
  {
    label: "Address Line 2",
    name: "addressLine2",
    placeHolder: "Enter Address line 2",
    required: false,
  },
  { label: "City", name: "city", placeHolder: "Enter City", required: true },
  { label: "State", name: "state", placeHolder: "Enter State", required: true },
  {
    label: "Postal Code",
    name: "postalCode",
    placeHolder: "Enter postal code",
    required: true,
  },
  {
    label: "Country",
    name: "country",
    placeHolder: "Enter country",
    required: true,
  },
];

export const initialShippingAddressValues = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};
