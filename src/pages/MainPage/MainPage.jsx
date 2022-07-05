import React from 'react';
import Content from '../../components/Content';

import withAuth from '../../hoc/withAuth';

function MainPage() {
  return (
    <Content />
  );
}

export default withAuth(MainPage);
