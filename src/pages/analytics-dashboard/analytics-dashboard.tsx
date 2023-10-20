import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from 'devextreme-react/toolbar';
import Tabs from 'devextreme-react/tabs';
import { LoadPanel } from 'devextreme-react/load-panel';
import ScrollView from 'devextreme-react/scroll-view';

import { useScreenSize } from '../../utils/media-query';

import {
  ToolbarAnalytics,
  RevenueSnapshotCard,
  RevenueAnalysisCard,
  ConversionCard,
  RevenueCard,
  ConversionTicker,
  LeadsTicker,
  OpportunitiesTicker,
  RevenueTotalTicker
} from '../../components';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';
import { Sale, SaleOrOpportunityByCategory, SaleByState } from '../../types/analytics';

import './analytics-dashboard.scss';

const calculateTotal = (data: (SaleOrOpportunityByCategory & Sale)[]) => {
  return data.reduce((acc, item) => acc + (item.value || item.total), 0);
};

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api';

const getData = async (url: any) => (await axios.get(`${baseUrl}/${url}`)).data;

const getOpportunitiesByCategory = async (startDate: any, endDate: any) => await getData(`Analytics/OpportunitiesByCategory/${startDate}/${endDate}`);
const getSalesByCategory = async (startDate: any, endDate: any) => getData(`Analytics/SalesByCategory/${startDate}/${endDate}`);
const getSales = async (startDate: any, endDate: any) => getData(`Analytics/Sales/${startDate}/${endDate}`);
const getSalesByStateAndCity = async (startDate: any, endDate: any) => getData(`Analytics/SalesByStateAndCity/${startDate}/${endDate}`);
const getSalesByOrderDate = async (groupByPeriod: any) => getData(`Analytics/SalesByOrderDate/${groupByPeriod}`);
const calcSalesByState = (sales: any) => Object.values(sales.reduce((res: any, item: any) => {
  const state = res[item.stateName] || {
    stateName: item.stateName,
    stateCoords: item.stateCoords,
    total: 0,
    percentage: 0,
  };

  state.total += item.total;
  state.percentage += item.percentage;
  res[item.stateName] = state;
  return res;
}, {}));



const items = Object.keys(ANALYTICS_PERIODS);
export const AnalyticsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].index);
  const [dateRange, setDateRange] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/'));
  const [opportunities, setOpportunities] = useState<SaleOrOpportunityByCategory[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<SaleOrOpportunityByCategory[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesByState, setSalesByState] = useState<SaleByState[]>([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [opportunitiesTotal, setOpportunitiesTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tabsWidth, setTabsWidth] = useState<number | string>('auto');

  const { isXSmall } = useScreenSize();

  useEffect(() => {
    Promise.all([
      getOpportunitiesByCategory(dateRange[0],dateRange[1]).then((data: any) => {
        setOpportunities(data);
        setOpportunitiesTotal(calculateTotal(data));
      }),
      getSalesByCategory(dateRange[0],dateRange[1]).then((data: any) => setSalesByCategory(data)),
      getSales(dateRange[0],dateRange[1]).then((data: any) => {
        setSales(data);
        setSalesTotal(calculateTotal(data));
      }),
      getSalesByStateAndCity(dateRange[0],dateRange[1])
        .then((data: any) => calcSalesByState(data))
        .then((data: any) => setSalesByState(data)),
    ])
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e:any) => {
    const { index, period } = ANALYTICS_PERIODS['Week'];
    setTabIndex(index);
    setDateRange(period.split('/'));
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setTabsWidth(isXSmall ? 150 : 'auto');
  }, []);

  return (
    <ScrollView className='view-wrapper-scroll'>
      <ToolbarAnalytics
        title=''
        additionalToolbarContent={
          <Item
            location='before'
          >
            <Tabs
              width={tabsWidth}
              scrollByContent
              showNavButtons={false}
              dataSource={items}
              selectedIndex={tabIndex}
              onItemClick={onTabClick}
            />
          </Item>
        }
      >
        <div className='cards compact'>
          <OpportunitiesTicker value={opportunitiesTotal} />
          <RevenueTotalTicker value={salesTotal} />
          <ConversionTicker value={16} />
          <LeadsTicker value={51} />
        </div>
        <div className='cards normal'>
          <RevenueCard datasource={sales} />
          <ConversionCard datasource={opportunities} />
          <RevenueAnalysisCard datasource={salesByState} />
          <RevenueSnapshotCard datasource={salesByCategory} />
        </div>
      </ToolbarAnalytics>
      <LoadPanel container='.content' visible={isLoading} position={{ of: '.layout-body' }} />
    </ScrollView>
  );
};
