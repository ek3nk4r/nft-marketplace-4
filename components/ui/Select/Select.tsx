import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import Chip from '../Chip';
import Icon from '../Icon';

import { Colors } from 'style/theme/types';

const invertedColor = (color?: keyof Colors): keyof Colors => {
  switch (color) {
    case 'primary':
      return 'invertedContrast';
    case 'primaryLight':
      return 'primary';
    case 'invertedContrast':
    case 'whiteBlur':
    default:
      return 'contrast';
  }
};

interface Props {
  badge?: number;
  children: (f: (b: boolean) => void) => React.ReactNode;
  className?: string;
  color?: keyof Colors;
  disabled?: boolean;
  text: string;
}

const Select = ({
  badge,
  children,
  className,
  color,
  disabled = false,
  text,
}: Props) => {
  const [isExpanded, setSelectExpanded] = useState(false);
  const isBadge = badge !== undefined && badge !== 0;

  const toggleSelect = () => {
    return setSelectExpanded((prevState) => !prevState);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setSelectExpanded(false);
      }}
    >
      <SelectContainer className={className} suppressHydrationWarning>
        <SelectRoot
          color={color}
          disabled={disabled}
          isBadge={isBadge}
          onClick={toggleSelect}
          suppressHydrationWarning
        >
          <SLabelContainer>
            {text}
            {isBadge && (
              <Chip
                color={invertedColor(color)}
                noBorder
                size="medium"
                text={badge}
                variant="rectangle"
              />
            )}
          </SLabelContainer>
          <SIconContainer isExpanded={isExpanded}>
            <Icon name="arrowBottom" />
          </SIconContainer>
        </SelectRoot>
        {isExpanded && <SelectOptions>{children(toggleSelect)}</SelectOptions>}
      </SelectContainer>
    </ClickAwayListener>
  );
};

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  min-width: 23rem;
`;

const SelectRoot = styled.button<{ color?: keyof Colors; isBadge?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme, color }) =>
    color ? theme.colors[`${color}`] : theme.colors.invertedContrast};
  border: none;
  border-radius: 1.2rem;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  outline: none;
  padding: ${({ isBadge }) => (isBadge ? '1.2rem 2.4rem' : '2rem 2.4rem')};
  text-transform: capitalize;
  z-index: 20;

  &:disabled {
    border: 2px solid;
    cursor: disabled;
    opacity: 0.5;
  }

  color: ${({ theme, color }) => theme.colors[invertedColor(color)]};
`;

const SLabelContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
`;

const SIconContainer = styled.div<{ isExpanded?: boolean }>`
  fill: ${({ theme }) => theme.colors.invertedContrast};
  width: 1.6rem;
  margin-left: 1.6rem;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)'};
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
`;

const SelectOptions = styled.ul`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral500};
  border-radius: 1.2rem;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
  list-style-type: none;
  margin: -2rem 0 0;
  padding: 4rem 2rem 2rem;
  position: absolute;
  top: 6.4rem;
  left: 50%;
  transform: translateX(calc(-50% + 0px));
  z-index: 10;

  > li {
    color: ${({ theme }) => theme.colors.neutral300};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
    line-height: 1.3;
    margin-top: 2rem;
    text-transform: capitalize;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export default Select;
