import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DetailAdder from '../../molecules/detail_adder';
import CreateDetailListItem from '../../molecules/create_detail_list_item';
import { addDetailAction, removeDetailAction } from '../../../../modules/actions/createbucket';

const DetailListWrapper = styled.div`
  margin-top: 15px;
`;

const CreateDetailList = ({ details }) => {
  // TODO : state로 바꿔야함
  const Details = (items) => {
    return items.map((item) => {
      return <CreateDetailListItem detail={item} />;
    });
  };

  return (
    <DetailListWrapper>
      <DetailAdder />
      {Details(details)}
    </DetailListWrapper>
  );
};

const mapStateToProps = (state) => ({ details: state.createbucket.details });

export default connect(mapStateToProps, { addDetailAction, removeDetailAction })(CreateDetailList);
