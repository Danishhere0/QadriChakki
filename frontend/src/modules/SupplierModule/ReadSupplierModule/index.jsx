import NotFound from '@/components/NotFound';
import { ErpLayout } from '@/layout';
import ReadItem from '@/modules/ErpPanelModule/ReadItem';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagColor } from '@/utils/statusTagColor';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useParams } from 'react-router-dom';
import ReadSupplier from '@/modules/ErpPanelModule/ReadSupplier';
import ErpPanel from '@/modules/ErpPanelModule';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { CreditCardOutlined } from '@ant-design/icons';
import DataTable from '@/modules/ErpPanelModule/DataTable';

export default function ReadSupplierModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);
  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);
  // const { _id } = currentResult;

  // console.log('currentResult', _id, currentResult);

  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'invoice';
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

  const Labels = {
    PANEL_TITLE: translate('invoice'),
    DATATABLE_TITLE: translate('invoice_list'),
    ADD_NEW_ENTITY: translate('add_new_invoice'),
    ENTITY_NAME: translate('invoice'),
    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config2 = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
    type: 'purchase',
    // _id,
  };

  const extra = [
    {
      label: translate('Record Payment'),
      key: 'recordPayment',
      icon: <CreditCardOutlined />,
    },
  ];
  console.log('config2', config2);

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <>
        <ReadSupplier config={config} selectedItem={currentResult} />
        <ErpLayout>
          {isSuccess ? (
            <>
              {/* <ErpPanel
              config={config2}
          
            ></ErpPanel> */}
              <DataTable config={{...config2,_id:currentResult._id}} extra={extra} />
              {/* <DataTable config={config2} extra={extra} /> */}
            </>
          ) : (
            <NotFound entity={config.entity} />
          )}
        </ErpLayout>
      </>
    );
}
