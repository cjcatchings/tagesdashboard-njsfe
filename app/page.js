import Image from 'next/image'
import styles from './page.module.css'
import {Page as AuthPage} from './login/page';

export default function Home() {

  return (
    <main className={styles.main}>
      Main page
    </main>
  )
}
