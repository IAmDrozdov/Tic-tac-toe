import React from "react";
import * as S from "./styled";

const Landing = () => (
  <S.Container>
    <S.Text>Find yourself anywhere</S.Text>
    <S.CellContainer>
      <div className="column">
        <S.Cell borderRight borderBottom> </S.Cell>
        <S.Cell borderRight> </S.Cell>
        <S.Cell borderRight borderTop> </S.Cell>
      </div>
      <div className="column">
        <S.Cell borderBottom> </S.Cell>
        <S.Cell x><S.X /></S.Cell>
        <S.Cell borderTop> </S.Cell>
      </div>
      <div className="column">
        <S.Cell borderLeft borderBottom> </S.Cell>
        <S.Cell borderLeft> </S.Cell>
        <S.Cell borderLeft borderTop> <S.O /> </S.Cell>
      </div>
    </S.CellContainer>
  </S.Container>
);

export default Landing;
