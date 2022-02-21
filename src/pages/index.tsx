import { history } from 'umi';
import routes from '../routes';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div className={styles.container}>
      {
        routes.map(item => {
          return  <div><a onClick={() => history.push(item.path)}>{item.name}</a></div>
        })
      }
    </div>
  );
}
