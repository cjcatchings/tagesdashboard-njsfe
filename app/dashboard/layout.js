import Header from '../../components/header/defaultHeader';
import { headers } from 'next/headers';

export default function Layout({children}){

    const nameHeader = headers().get("X-Full-Name");

    return(
        <section>
            <Header fullName={nameHeader}/>
            {children}
        </section>
    );

}