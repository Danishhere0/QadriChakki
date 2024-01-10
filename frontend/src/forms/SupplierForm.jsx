import { Form, Input, Select } from 'antd';
import { DatePicker } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';
import { useDate } from '@/settings';

import useLanguage from '@/locale/useLanguage';

export default function SupplierForm() {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  return (
    <>
      <Form.Item
        name="name"
        label={translate('name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="legalName"
        label={translate('Legal Name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label={translate('Address')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label={translate('email')}
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label={translate('phone')}
        rules={[
          {
            required: true,
          },
          {
            pattern: validatePhoneNumber, // importing regex from helper.js utility file to validate
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="city"
        label={translate('City')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
