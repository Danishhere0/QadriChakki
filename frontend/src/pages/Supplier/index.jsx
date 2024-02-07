import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import SupplierForm from '@/forms/SupplierForm';
import dayjs from 'dayjs';
import { useDate } from '@/settings';
import { fields } from './config';
import DynamicForm from '@/forms/DynamicForm';
import SupplierDataTableModule from '@/modules/SupplierModule/SupplierDataTableModule';

export default function Supplier() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'supplier';
  const searchConfig = {
    displayLabels: ['name', 'legalName'],
    searchFields: 'name,legalName,birthday',
    outputValue: '_id',
  };

  const deleteModalLabels = ['name', 'legalName'];

  const dataTableColumns = [
    {
      title: translate('name'),
      dataIndex: 'name',
    },
    {
      title: translate('legal name'),
      dataIndex: 'legalName',
    },
    {
      title: translate('City'),
      dataIndex: 'city',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('Peoples'),
      dataIndex: 'peoples',
    },
    {
      title: translate('Products'),
      dataIndex: 'products',
    },
  ];

  const readColumns = [
    {
      title: translate('first name'),
      dataIndex: 'name',
    },
    {
      title: translate('last name'),
      dataIndex: 'legalName',
    },
    {
      title: translate('gender'),
      dataIndex: 'gender',
    },
    {
      title: translate('Department'),
      dataIndex: 'department',
    },
    {
      title: translate('Position'),
      dataIndex: 'position',
    },
    {
      title: translate('address'),
      dataIndex: 'address',
    },
    {
      title: translate('state'),
      dataIndex: 'state',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('supplier'),
    DATATABLE_TITLE: translate('supplier_list'),
    ADD_NEW_ENTITY: translate('add_new_supplier'),
    ENTITY_NAME: translate('supplier'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    // fields,
    searchConfig,
    deleteModalLabels,
    type: 'purchase',
  };
  return (
    <CrudModule
      createForm={<SupplierForm />} // Retaining InventoryForm
      updateForm={<SupplierForm isUpdateForm={true} />}
      config={config}
    />
    // <SupplierDataTableModule config={config} />
  );
}
