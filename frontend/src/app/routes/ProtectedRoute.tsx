import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useUser} from "@/entities/user";
import {LoadingPlaceholder} from "@/shared/ui/loading-placeholder";

type ProtectedRouteProps = {
    requireAdmin?: boolean;
};

export const ProtectedRoute = ({requireAdmin = false}: ProtectedRouteProps) => {
    const {user, isLoading, isAuthenticated} = useUser();
    const location = useLocation();

    if (isLoading) return <LoadingPlaceholder/>;

    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{from: location}} replace/>;
    }

    if (requireAdmin && !user?.is_admin) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
};