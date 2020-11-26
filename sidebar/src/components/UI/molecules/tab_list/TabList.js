import React from 'react';
import Tab from '@material-ui/core/Tab';

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const createTabList = (tabs) => {
  return tabs.map((tab, index) => {
    return <Tab key={index} label={tab.label} {...a11yProps(index)} />;
  });
};

export default createTabList;
