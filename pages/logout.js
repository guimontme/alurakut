import { useRouter } from 'next/router';
import React from 'react';
import cookies from 'nookies';

export default function LogoutPage() {
    cookies.destroy(null, 'USER_TOKEN');
    const router = useRouter();
    React.useEffect(() => {
        router.push('/login');
    }, [])
    return <p></p>;
};