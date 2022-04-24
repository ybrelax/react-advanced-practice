import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import styleJs from './style';
import styled from 'styled-components';
import { Property } from 'csstype';

const Text = styled.p`
  color: red;
`;

const Text7 = styled(Text)<{
  textBg: string;
}>({
  background: ((props: { textBg: any }) =>
    props.textBg || 'yellow') as unknown as Property.Background,
});

const Chapter9: React.FC = () => {
  return (
    <div>
      <p className={styles.text}>道格拉斯牛逼</p>
      <p className="text">测试文字第二段</p>
      <p className={styles.text3}>测试文字第三段</p>
      <p className={styles.text4}>测试文字第四段</p>
      <p
        className={classNames({
          [styles.text3]: true,
          [styles.text4]: false,
        })}
      >
        测试文字第五段
      </p>

      <p style={styleJs.text6Style}>测试文字第六段</p>

      <Text7 textBg={'green'}>测试文字第七段</Text7>
    </div>
  );
};

export default Chapter9;
