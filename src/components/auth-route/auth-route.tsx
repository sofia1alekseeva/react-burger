import { Navigate, useLocation } from "react-router";
import { FC, PropsWithChildren } from "react";

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  onlyAuth?: boolean;
}

export const ProtectedRoute: FC<PropsWithChildren<IProtectedRouteProps>> = ({
  children,
  onlyUnAuth = false,
  onlyAuth = false,
}) => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  const location = useLocation();
  if (onlyUnAuth) {
    return !accessToken ? (
      <>{children}</>
    ) : (
      <Navigate to={"/"} state={{ from: location }} />
    );
  }
  if (onlyAuth) {
    return accessToken ? (
      <>{children}</>
    ) : (
      <Navigate to={"/login"} state={{ from: location }} />
    );
  }
  return null;
};

export const OnlyAuth: FC<PropsWithChildren> = ({ children }) => (
  <ProtectedRoute onlyAuth={true} children={children} />
);
export const OnlyUnAuth: FC<PropsWithChildren> = ({ children }) => (
  <ProtectedRoute onlyUnAuth={true} children={children} />
);
