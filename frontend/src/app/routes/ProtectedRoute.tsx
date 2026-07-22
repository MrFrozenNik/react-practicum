import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "@/entities/user";
import {LoadingPlaceholder} from "@/shared/ui/loading-placeholder";

type ProtectedRouteProps = {
    requireAdmin?: boolean;
};

export const ProtectedRoute = ({requireAdmin = false}: ProtectedRouteProps) => {
    const {user, isLoading, isAuthenticated} = useUser();

    if (isLoading) return <LoadingPlaceholder/>;

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace/>;
    }

    if (requireAdmin && !user?.is_admin) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
};