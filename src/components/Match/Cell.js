import React from "react";
import * as S from "./styled";

const Cell = (props) => {
  return (
    <S.Cell>
      <S.CellButton
        empty={!props.cell.value}
        onClick={() => props.mark(props.cell.index)}
        disabled={Boolean(props.disableClick)}>
        {props.cell.value || "·"}
      </S.CellButton>
    </S.Cell>

  );
};

export default Cell;

