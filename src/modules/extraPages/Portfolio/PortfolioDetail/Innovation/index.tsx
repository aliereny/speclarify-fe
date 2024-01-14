import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import InnovationImgWrapper from './InnovationImgWrapper';
import {
  StyledInnovation,
  StyledSecondaryText,
  StyledTitle3,
  StyledTitle5,
  StyledTitlewrapper5,
  StyledWrapper,
} from './index.styled';
import { Button, Col } from 'antd';
import type { InnovationType } from '@crema/types/models/extrapages/Portfolio';
import Image from 'next/image';

type Props = {
  innovation: InnovationType;
};
const Innovation = ({ innovation }: Props) => {
  return (
    <StyledInnovation>
      <AppRowContainer>
        <Col xs={24} md={12}>
          <InnovationImgWrapper>
            <Image
              src={innovation.srcImg}
              alt='innovation'
              width={710}
              height={397}
              sizes='100vw'
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <div className='innovation-img-content'>
              <StyledTitle5>{innovation.brandSubTitle}</StyledTitle5>
              <StyledTitle3>{innovation.brandTitle}</StyledTitle3>
            </div>
          </InnovationImgWrapper>
        </Col>
        <Col xs={24} md={12}>
          <StyledWrapper>
            <StyledTitlewrapper5>{innovation.title}</StyledTitlewrapper5>
            <StyledSecondaryText>{innovation.description}</StyledSecondaryText>
            <Button type='primary'>Explore Website</Button>
          </StyledWrapper>
        </Col>
      </AppRowContainer>
    </StyledInnovation>
  );
};

export default Innovation;