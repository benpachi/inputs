/*import { useDisplay } from "../context/DisplayContext";
import type { DisplayItem } from "../interface/display-item";

const AddElementButton = () => {
  const { addElement, setSelectedID } = useDisplay();

  return (
    <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), ...DEFAULT_ALL, ...DEFAULT_ELLIPSE}))}>Add (button type)</button>
  );
}

//above: what exactly are we passing in? SOMETHING needs to let the button know what it creates.
//not sure if there's like... a typescripty way to do it or if i should just pass a string to tell the button which type of display item it creates

export default AddElementButton;

const DEFAULT_ALL = {
  rotation: 0,
  label: '',
  strokeWidth: 5,
}

const DEFAULT_ELLIPSE = {
  name: "Ellipse",
  type: "ellipse",
  width: 50,
  height: 50,
  x: 200,
  y: 150,
  fillColor: "#000000",
  strokeColor: "#ff0000",
} 

const DEFAULT_RECTANGLE = {
  name: "Rectangle",
  type: "rectangle",
  width: 50,
  height: 50,
  x: 200,
  y: 150,
  fillColor: "#000000",
  strokeColor: "#ff0000",
} 

const DEFAULT_DPAD = {
  name: "DPad",
  type: "d-pad",
  pointLength: 25,
  armWidth: 50,
  armLength: 50,
  x: 200,
  y: 150,
  fillColor: "#000000",
  strokeColor: "#ff0000",
}

const DEFAULT_PLUS = {
  name: "Plus",
  type: "plus",
  armWidth: 33,
  armLength: 50,
  x: 200,
  y: 150,
  fillColor: "#000000",
  strokeColor: "#ff0000",
}

const DEFAULT_CONNECTED_DPAD = {
  name: "Connected DPad",
  type: "connected d-pad",
  armWidth: 33,
  armLength: 50,
  x: 200,
  y: 150,
  fillColor: "#000000",
  strokeColor: "#ff0000",
}*/