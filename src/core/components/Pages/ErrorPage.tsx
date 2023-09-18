import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Alert from '../Alert';
import Text from '../Text';

const ErrorPage = () => {
    
    return (
        <MainLayout>
            <div className='h-screen w-screen flex flex-col items-center justify-center'>
                <Link className='mt-5' to="/" >
                    <Alert className={['p-5']} >
                        <Text fontSize='lg' fontWeight='semibold' lineHeight='10'>
                            UPPS!! <br />
                            Something went wrong :/
                        </Text>
                    </Alert>
                </Link>
            </div>
        </MainLayout>
    )
}

export default ErrorPage