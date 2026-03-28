import type { StickMoveBinding } from "../types/binding";

const MoveBindField = ({ onChange, value }: {
  value: StickMoveBinding | null;
  onChange: (field: string, value: StickMoveBinding | null) => void;
}) => {

  const leftStick: StickMoveBinding = {
    kind: "stick",
    xIndex: 0,
    yIndex: 1,
  }

  const rightStick: StickMoveBinding = {
    kind: "stick",
    xIndex: 2,
    yIndex: 3,
  }

  return (
    <form>
      {'Move with:'}<br />
        <label>
        <input 
          type="radio" 
          name="move-bind"
          checked={value === null}
          onChange={() => onChange('moveBinding', null)}
        />{'None'}
      </label><br />
      <label>
        <input 
          type="radio" 
          name="move-bind"
          checked={value?.xIndex === 0 && value?.yIndex === 1}
          onChange={() => onChange('moveBinding', leftStick)}
        />{'Left stick'}
      </label><br />
      <label>
        <input 
          type="radio" 
          name="move-bind"
          checked={value?.xIndex === 2 && value?.yIndex === 3}
          onChange={() => onChange('moveBinding', rightStick)}
        />{'Right stick'}
      </label><br />
    </form>
  );
}
 
export default MoveBindField;