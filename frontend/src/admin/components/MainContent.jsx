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
            <div className="p-4">
                {renderContent()}
            </div>
        </div>
    );
}