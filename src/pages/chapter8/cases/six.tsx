import React, { useContext, useState } from 'react';

type ContextType = {
  setTheme: Function | null;
  theme: React.CSSProperties | null;
};

const context = React.createContext<ContextType>({
  setTheme: null,
  theme: null,
});

const lightStyle = { color: 'red', borderColor: 'red' };
const blackStyle = { color: 'black', borderColor: 'black' };

const Input: React.FC<ContextType> = (props) => {
  const { theme } = useContext(context);
  return (
    <div>
      <input style={theme!} />
      <input style={props.theme!} />
    </div>
  );
};

const ComsumerInput = () => {
  return <context.Consumer>{(value) => <Input {...value} />}</context.Consumer>;
};

const CheckBox: React.FC = () => {
  const { theme, setTheme } = useContext(context);
  return (
    <div>
      <label style={theme!}>主题切换: </label>
      <input
        type="checkbox"
        onChange={(e) => {
          console.log(e);
          if (e.currentTarget.checked) {
            setTheme!(blackStyle);
          } else {
            setTheme!(lightStyle);
          }
        }}
      />
    </div>
  );
};

class Container extends React.PureComponent {
  render() {
    const { theme } = this.context;
    return (
      <div>
        <CheckBox />
        <ComsumerInput />

        <p style={theme}>当前主题颜色</p>
      </div>
    );
  }
}

Container.contextType = context;

const CaseSix: React.FC = () => {
  const [theme, setTheme] = useState(lightStyle);

  return (
    <context.Provider value={{ theme, setTheme }}>
      <Container />
    </context.Provider>
  );
};

export default CaseSix;
