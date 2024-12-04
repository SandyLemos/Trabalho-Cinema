import { Navigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { isAuthenticated, role, loading } = useAuthCheck();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute