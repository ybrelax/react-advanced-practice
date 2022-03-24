import React, {
  forwardRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from 'react';

class Form extends React.Component {
  render() {
    return <div>form 表单</div>;
  }
}

class Index extends React.Component<{
  forwardRef: MutableRefObject<unknown>;
}> {
  private form: RefObject<Form> = React.createRef();
  private button: HTMLButtonElement | null = null;

  componentDidMount() {
    const { forwardRef } = this.props;
    forwardRef.current = {
      form: this.form,
      index: this,
      button: this.button,
    };
  }

  render() {
    return (
      <div>
        <button ref={(e) => (this.button = e)} />
        <Form ref={this.form} />
      </div>
    );
  }
}

const NewIndex = forwardRef((props, ref) => (
  <Index forwardRef={ref as MutableRefObject<unknown>} {...props} />
));

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <div>
      <NewIndex ref={ref} />
    </div>
  );
}
