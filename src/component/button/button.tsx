import { button } from '../../model/button';
import './button.scss';

export function Button(props: button): JSX.Element {
  const { color, children, disable, onClick, basic, icon, type, size } = props;
  //
  const classProperties = [basic, icon, type, size].join(' ');
  //
  return (
    <button
      className={classProperties}
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
      disabled={disable}
    >
      {children}
    </button>
  );
}
