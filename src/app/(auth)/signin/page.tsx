import Link from 'next/link';
import styles from './page.module.css';
import SigninForm from '@/components/form/SigninForm/SigninForm';
import Image from 'next/image';

const Page = () => {
  return (
    <div id={styles.container}>
        <div id={styles.wrapper}>
            <Image src="/logo.png" alt='Error loading image' height={0} width={0} style={{height: "20%", width: "100%", objectFit: "contain"}} unoptimized={true}/>
            <SigninForm/>
            <span id={styles.text}>New here? <Link href="/signup" id={styles.link}>Register now.</Link></span>
            <Link href="/forgot-password" id={styles.link}>Forgot password</Link>
        </div>
    </div>
  )
}

export default Page