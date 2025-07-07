import { DashboardContent } from '../pages/DashboardContent';
import { PlansContent } from '../pages/PlansContent';
import { UsersContent } from '../pages/UsersContent';

export function MainContent({ selectItem }) {
    const renderContent = () => {
        switch (selectItem) {
            case 'dashboard':
                return <DashboardContent />;
            case 'usuarios':
                return <UsersContent />;
            case 'planos':
                return <PlansContent />;
            default:
                return <DashboardContent />;
        }
    };
    return (
        <div className="main-content">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage your application.</p>
            {/* Additional content can be added here */}
        </div>
    );
}