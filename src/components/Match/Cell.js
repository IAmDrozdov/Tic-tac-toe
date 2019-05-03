import React from 'react';
import * as MATCH_CONSTANTS from '../../constants/match';

const Cell = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <input type="button"
             value={props.cell.value || ''}
             style={{
               width: '100%',
               height: '100%',
               background: props.cell.value ? props.cell.value === MATCH_CONSTANTS.CROSS
                 ? 'red'
                 : 'green' : 'white'
             }}
             onClick={() => props.mark(props.cell.index)}
             disabled={props.disableClick} />
    </div>
  );
};

export default Cell;

