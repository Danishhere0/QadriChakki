export const fields = {
  // type: {
  //   type: 'selectwithfeedback',
  //   renderAsTag: true,
  //   options: [
  //     { value: 'people', label: 'people', color: 'magenta' },
  //     { value: 'company', label: 'company', color: 'blue' },
  //   ],
  //   required: true,
  //   hasFeedback: true,
  // },
  name: {
    type: 'string',
    // disableForForm: true,
  },
  legalName: {
    type: 'string',
    // disableForForm: true,
  },
  city: {
    type: 'city',
    // color: 'red',
    // disableForForm: true,
  },
  phone: {
    type: 'phone',
    // disableForForm: true,
  },
  email: {
    type: 'email',
    // disableForForm: true,
  },
  peoples: {
    type: 'search',
    label: 'people',
    entity: 'people',
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
    dataIndex: ['people', 'firstname'],
    // disableForTable: true,
    feedback: 'people',
  },
  products: {
    type: 'search',
    label: 'product',
    entity: 'product',
    displayLabels: ['name'],
    searchFields: 'name',
    dataIndex: ['product', 'name'],
    // disableForTable: true,
    feedback: 'product',
  },
};
