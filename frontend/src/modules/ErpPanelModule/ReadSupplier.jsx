import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate, useParams } from 'react-router-dom';
import { tagColor } from '@/utils/statusTagColor';
import SummaryCard from '../DashboardModule/components/SummaryCard';
import useFetch from '@/hooks/useFetch';
import { request } from '@/request';

export default function ReadSupplier({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { moneyFormatter } = useMoney();
  // const { send, isLoading: mailInProgress } = useMail({ entity });

  // const { result: currentResult } = useSelector(selectCurrentItem);

  const { result: invoiceResult, isLoading: invoiceLoading } = useFetch(() =>
    request.summary({ entity: 'invoice', id })
  );
  const { result: quoteResult, isLoading: quoteLoading } = useFetch(() =>
    request.summary({ entity: 'quote' })
  );

  const { result: offerResult, isLoading: offerLoading } = useFetch(() =>
    request.summary({ entity: 'offer' })
  );

  const { result: paymentResult, isLoading: paymentLoading } = useFetch(() =>
    request.summary({ entity: 'payment', id })
  );

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  console.log('clientResult', clientResult);

  const entityData = [
    {
      result: invoiceResult?.finalResult,
      isLoading: invoiceLoading,
      entity: 'purchase invoice',
      title: translate('Purchase Invoices'),
    },
    // {
    //   result: invoiceResult?.saleFinalResult,
    //   isLoading: invoiceLoading,
    //   entity: 'sale invoice',
    //   title: translate('Sale Invoices'),
    // },
    {
      result: offerResult,
      isLoading: offerLoading,
      entity: 'offer',
      title: translate('offers preview'),
    },
    {
      result: paymentResult,
      isLoading: paymentLoading,
      entity: 'payment',
      title: translate('payments preview'),
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (entity === 'offer') return null;

    return (
      <SummaryCard
        key={index}
        title={data?.entity === 'payment' ? translate('Payment') : translate(data?.entity)}
        tagColor={
          data?.entity === 'invoice' ? 'cyan' : data?.entity === 'quote' ? 'purple' : 'green'
        }
        prefix={translate('This month')}
        isLoading={isLoading}
        tagContent={moneyFormatter({ amount: result?.total })}
      />
    );
  });

  // console.log('currentResult', currentResult);
  // const resetErp = {
  //   status: '',
  //   client: {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     address: '',
  //   },
  //   subTotal: 0,
  //   taxTotal: 0,
  //   taxRate: 0,
  //   total: 0,
  //   credit: 0,
  //   number: 0,
  //   year: 0,
  // };

  // const [itemslist, setItemsList] = useState([]);
  // const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  // const [client, setClient] = useState({});

  return (
    <>
      <Row gutter={[32, 32]}>
        {cards}
        <SummaryCard
          title={translate('Due Balance')}
          tagColor={'red'}
          prefix={translate('Not Paid')}
          isLoading={invoiceLoading}
          tagContent={moneyFormatter({ amount: invoiceResult?.finalResult.total_undue })}
        />
      </Row>
      {/* <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ''}`}
        ghost={false}
        tags={[
          <Tag color={tagColor(currentErp.status)?.color} key="status">
            {currentErp.status && translate(currentErp.status)}
          </Tag>,
          currentErp.paymentStatus && (
            <Tag color={tagColor(currentErp.paymentStatus)?.color} key="paymentStatus">
              {currentErp.paymentStatus && translate(currentErp.paymentStatus)}
            </Tag>
          ),
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => {
              send(currentErp._id);
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title={translate('SubTotal')}
            value={moneyFormatter({ amount: currentErp.subTotal })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Total')}
            value={moneyFormatter({ amount: currentErp.total })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Balance')}
            value={moneyFormatter({ amount: currentErp.credit })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Client : ${currentErp.client.name}`}>
        <Descriptions.Item label={translate('Address')}>{client.address}</Descriptions.Item>
        <Descriptions.Item label={translate('email')}>{client.email}</Descriptions.Item>
        <Descriptions.Item label={translate('Phone')}>{client.phone}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Price')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Total')}</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item._id} item={item}></Item>
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>{translate('Sub Total')} :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.subTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {translate('Tax Total')} ({currentErp.taxRate} %) :
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.taxTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Total')} :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.total })}</p>
          </Col>
        </Row>
      </div> */}
    </>
  );
}
