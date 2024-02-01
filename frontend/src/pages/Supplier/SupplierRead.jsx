import useLanguage from '@/locale/useLanguage';
import ReadSupplierModule from '@/modules/SupplierModule/ReadSupplierModule';
// import SupplierDataTableModule from '@/modules/SupplierModule/SupplierDataTableModule';
import { useDate, useMoney } from '@/settings';

export default function SupplierRead() {
  const entity = 'supplier';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('supplier'),
    DATATABLE_TITLE: translate('supplier_list'),
    ADD_NEW_ENTITY: translate('add_new_supplier'),
    ENTITY_NAME: translate('supplier'),

    RECORD_ENTITY: translate('record_payment'),
  };
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'client.name'];
  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Type'),
      dataIndex: 'type',
    },

    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('expired Date'),
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
          },
        };
      },
      render: (total) => moneyFormatter({ amount: total }),
    },
    {
      title: translate('credit'),
      dataIndex: 'credit',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
          },
        };
      },
      render: (credit) => moneyFormatter({ amount: credit }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let tagStatus = tagColor(status);
        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {status && translate(tagStatus.label)}
          </Tag>
        );
      },
    },
    {
      title: translate('Payment'),
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => {
        let tagStatus = tagColor(paymentStatus);

        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {paymentStatus && translate(paymentStatus)}
          </Tag>
        );
      },
    },
    {
      title: translate('Created By'),
      dataIndex: ['createdBy', 'name'],
    },
  ];

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
    type: 'purchase',
  };

  return <ReadSupplierModule config={configPage} />;
}
