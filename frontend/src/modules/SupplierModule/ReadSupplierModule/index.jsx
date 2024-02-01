import NotFound from '@/components/NotFound';
import { ErpLayout } from '@/layout';
import ReadItem from '@/modules/ErpPanelModule/ReadItem';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import ReadSupplier from '@/modules/ErpPanelModule/ReadSupplier';
import ErpPanel from '@/modules/ErpPanelModule';

export default function ReadSupplierModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);
  console.log('config', config);
  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <ErpLayout>
        {isSuccess ? (
          <>
            <ReadSupplier config={config} selectedItem={currentResult} />
            <ErpPanel
              config={config}
              extra={[
                {
                  label: translate('Record Payment'),
                  key: 'recordPayment',
                  icon: <CreditCardOutlined />,
                },
              ]}
            ></ErpPanel>
          </>
        ) : (
          <NotFound entity={config.entity} />
        )}
      </ErpLayout>
    );
}
